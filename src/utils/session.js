const SECRET = 'farmers-market-secret-key-12345';
const SESSION_KEY = 'currentUser';

/**
 * Encodes a string to Base64 in a browser-compatible way
 */
const base64Encode = (str) => {
  return btoa(unescape(encodeURIComponent(str)));
};

/**
 * Decodes a Base64 string in a browser-compatible way
 */
const base64Decode = (str) => {
  try {
    return decodeURIComponent(escape(atob(str)));
  } catch (e) {
    return null;
  }
};

/**
 * Generates a simple checksum signature using the djb2 algorithm combined with a secret key
 */
const generateSignature = (payloadStr, secret) => {
  const data = payloadStr + secret;
  let hash = 5381;
  for (let i = 0; i < data.length; i++) {
    hash = (hash * 33) ^ data.charCodeAt(i);
  }
  return (hash >>> 0).toString(16);
};

/**
 * Serializes the session payload, encodes it as base64, and appends a checksum signature
 */
export const createToken = (payload) => {
  const payloadStr = JSON.stringify(payload);
  const payloadB64 = base64Encode(payloadStr);
  const signature = generateSignature(payloadB64, SECRET);
  return `${payloadB64}.${signature}`;
};

/**
 * Verifies a token's checksum signature and returns the parsed payload if valid
 */
export const verifyToken = (token) => {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payloadB64, signature] = parts;
  const expectedSignature = generateSignature(payloadB64, SECRET);
  
  if (signature !== expectedSignature) {
    console.error('Session token signature verification failed! Tampering detected.');
    return null;
  }

  const payloadStr = base64Decode(payloadB64);
  if (!payloadStr) return null;

  try {
    return JSON.parse(payloadStr);
  } catch (e) {
    return null;
  }
};

/**
 * Resolves the user session, verifying the token.
 * Incorporates a fallback migration to upgrade legacy raw JSON sessions.
 */
export const getSession = () => {
  const sessionVal = localStorage.getItem(SESSION_KEY);
  if (!sessionVal) {
    return { isAuthenticated: false, role: null, email: '' };
  }

  // 1. Try to verify as signed token
  const payload = verifyToken(sessionVal);
  if (payload) {
    return {
      isAuthenticated: true,
      role: payload.role,
      email: payload.email,
    };
  }

  // 2. Fallback migration for legacy plain JSON
  try {
    const legacySession = JSON.parse(sessionVal);
    if (legacySession && legacySession.hasOwnProperty('isAuthenticated') && legacySession.role && legacySession.email) {
      // Migrate legacy structure to signed token format automatically
      setSession(legacySession.role, legacySession.email);
      return {
        isAuthenticated: legacySession.isAuthenticated,
        role: legacySession.role,
        email: legacySession.email,
      };
    }
  } catch (e) {
    // String is not valid JSON
  }

  // Clear invalid sessions
  clearSession();
  return { isAuthenticated: false, role: null, email: '' };
};

/**
 * Creates and stores a signed token session in localStorage
 */
export const setSession = (role, email) => {
  const payload = {
    role,
    email,
    timestamp: Date.now(),
  };
  const token = createToken(payload);
  localStorage.setItem(SESSION_KEY, token);
};

/**
 * Clears the session from localStorage
 */
export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
};
