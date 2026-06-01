import { NextResponse } from 'next/server';

/* ------------------------------------------------------------------
   Rate Limiting (In-Memory IP Bucket Store)
   Note: In serverless environments, this memory is shared across hot
   instances but might reset occasionally. This is perfectly sufficient
   to demonstrate rate limiting mechanisms.
   ------------------------------------------------------------------ */
const ipRequests = new Map();
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_REQUESTS_PER_WINDOW = 3;

function isRateLimited(ip) {
  const now = Date.now();
  if (!ipRequests.has(ip)) {
    ipRequests.set(ip, [now]);
    return false;
  }

  const timestamps = ipRequests.get(ip);
  // Filter out expired timestamps
  const activeTimestamps = timestamps.filter((time) => now - time < RATE_LIMIT_WINDOW_MS);
  
  if (activeTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  activeTimestamps.push(now);
  ipRequests.set(ip, activeTimestamps);
  return false;
}

/* ------------------------------------------------------------------
   Validation and Sanitization Helper Functions
   ------------------------------------------------------------------ */
function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(req) {
  try {
    // 1. Extract IP Address for Rate Limiting
    const forwardedFor = req.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    // 2. Perform Rate Limiting check
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Por favor, intente de nuevo en 5 minutos.' },
        { status: 429 }
      );
    }

    // 3. Parse JSON Body
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Cuerpo de solicitud inválido.' }, { status: 400 });
    }

    const { name, email, message } = body;

    // 4. Server-Side Validations
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'El nombre es obligatorio.' }, { status: 400 });
    }
    if (name.length > 100) {
      return NextResponse.json({ error: 'El nombre no debe exceder los 100 caracteres.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Formato de correo electrónico inválido.' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'El mensaje es obligatorio.' }, { status: 400 });
    }
    if (message.length > 1000) {
      return NextResponse.json({ error: 'El mensaje no debe exceder los 1000 caracteres.' }, { status: 400 });
    }

    // 5. Server-Side Sanitization to prevent XSS
    const cleanName = sanitizeInput(name);
    const cleanEmail = email.trim().toLowerCase();
    const cleanMessage = sanitizeInput(message);

    console.log(`[Contacto Recibido] IP: ${clientIp} | De: ${cleanName} <${cleanEmail}>`);
    console.log(`[Mensaje]: ${cleanMessage}`);

    // 6. Realistic Email Service dispatch (e.g. Resend, SendGrid, or Nodemailer)
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (RESEND_API_KEY) {
      // Dispatch via Resend REST API (avoids heavy dependencies)
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'CyberShield Contacto <onboarding@resend.dev>',
          to: 'contacto@cybershieldsolutions.com',
          subject: `Nuevo mensaje de ${cleanName}`,
          html: `
            <h3>Nuevo mensaje de contacto</h3>
            <p><strong>Nombre:</strong> ${cleanName}</p>
            <p><strong>Email:</strong> ${cleanEmail}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${cleanMessage.replace(/\n/g, '<br>')}</p>
            <hr />
            <p>Enviado desde el formulario de CyberShield Solutions.</p>
          `,
        }),
      });

      if (!resendRes.ok) {
        const errText = await resendRes.text();
        console.error('[Resend Error]', errText);
        return NextResponse.json(
          { error: 'Error al enviar el correo a través del servicio de mensajería.' },
          { status: 502 }
        );
      }
    } else {
      console.log('--- [Simulación de Servicio de Correo] RESEND_API_KEY no configurada. Mensaje procesado con éxito en consola. ---');
    }

    // 7. Successful sanitised response
    return NextResponse.json({
      success: true,
      message: 'Mensaje recibido y procesado correctamente de forma segura.',
      data: {
        name: cleanName,
        email: cleanEmail,
      },
    });

  } catch (error) {
    console.error('[API Contact Error]', error);
    return NextResponse.json({ error: 'Ocurrió un error interno en el servidor.' }, { status: 500 });
  }
}
