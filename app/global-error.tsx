'use client';

export default function GlobalError() {
  return (
    <html>
      <body style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#1a1a2e',
        color: '#ffffff',
        textAlign: 'center',
        padding: '2rem',
        margin: 0,
        fontFamily: 'system-ui, sans-serif'
      }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>Error</h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Something went wrong!</p>
      </body>
    </html>
  );
}
