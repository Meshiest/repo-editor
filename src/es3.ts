import { gunzip, gzip } from 'jsr:@deno-library/compress';
import { pbkdf2Sync, randomBytes, subtle } from 'node:crypto';

export async function encrypt(
  data: Uint8Array,
  password: string,
  options?: { gzip?: boolean }
) {
  if (options?.gzip) data = gzip(data);

  const iv = randomBytes(16);
  const hmac = pbkdf2Sync(password, iv, 100, 16, 'sha1');
  const key = await subtle.importKey('raw', hmac, 'AES-CBC', false, [
    'encrypt',
  ]);
  const encrypted = await subtle.encrypt({ name: 'AES-CBC', iv }, key, data);

  return new Uint8Array([...iv, ...new Uint8Array(encrypted)]);
}

export async function decrypt(ciphertext: Uint8Array, password: string) {
  const iv = ciphertext.slice(0, 16);
  ciphertext = ciphertext.slice(16);

  const key = pbkdf2Sync(password, iv, 100, 16, 'sha1');
  const hmac = await subtle.importKey('raw', key, 'AES-CBC', false, [
    'decrypt',
  ]);
  const cleartext = await subtle.decrypt(
    { name: 'AES-CBC', iv },
    hmac,
    ciphertext
  );

  const prefix = new Uint8Array(cleartext.slice(0, 2));
  if (prefix[0] === 0x1f && prefix[1] === 0x8b)
    return gunzip(new Uint8Array(cleartext));

  return new Uint8Array(cleartext);
}
