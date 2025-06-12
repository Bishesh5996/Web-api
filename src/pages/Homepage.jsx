import React from 'react';

export default function Homepage() {
  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#333', // dark text on white bg
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: '20px',
        boxSizing: 'border-box',
        textAlign: 'center',
        backgroundColor: '#fff', // white background
      }}
    >
      <h1 style={{ fontWeight: '700', fontSize: '4rem', marginBottom: '1rem', color: '#4B0082' }}>
        Thrift Hub
      </h1>
      <p style={{ fontSize: '1.5rem', maxWidth: '600px', marginBottom: '2rem' }}>
        Your go-to online thrift store for unique, sustainable, and affordable fashion. 
        Discover amazing second-hand treasures and give pre-loved items a new life!
      </p>

      {/* Image gallery section */}
      <div
        style={{
          display: 'flex',
          gap: '1.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          maxWidth: '900px',
          marginBottom: '3rem',
          width: '100%',
        }}
      >
        {/* Replace these with your actual images */}
        <img
          src="src/assets/images.jpeg"
          alt="Vintage Clothes"
          style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
        />
        <img
          src="src/assets/download.jpeg"
          alt="Thrift Shopping"
          style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
        />
        <img
          src="src/assets/images (1).jpeg"
          alt="Secondhand Fashion"
          style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          gap: '2rem',
          paddingBottom: '1rem',
        }}
      >
        {/* Instagram */}
        <a
          href="https://instagram.com/thrifthub"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          style={{ color: '#4B0082', textDecoration: 'none' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            width="36"
            height="36"
          >
            <path d="M7.75 2h8.5C18.55 2 20 3.45 20 5.75v8.5c0 2.3-1.45 3.75-3.75 3.75h-8.5C5.45 18 4 16.55 4 14.25v-8.5C4 3.45 5.45 2 7.75 2zm7.88 1.75a.625.625 0 1 0 0 1.25.625.625 0 0 0 0-1.25zM12 7.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5zm0 1.5a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5z" />
          </svg>
        </a>

        {/* Facebook */}
        <a
          href="https://facebook.com/thrifthub"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          style={{ color: '#4B0082', textDecoration: 'none' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            width="36"
            height="36"
          >
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.988h-2.54v-2.89h2.54V9.845c0-2.506 1.492-3.89 3.778-3.89 1.094 0 2.238.195 2.238.195v2.466h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
