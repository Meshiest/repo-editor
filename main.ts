import { decrypt, encrypt } from './src/es3.ts';

export const REPO_SECRET =
  "Why would you want to cheat?... :o It's no fun. :') :'D";

export const es3 = { decrypt, encrypt };

if (import.meta.main) {
  const file = Deno.args[0];

  if (!file) {
    console.error('Missing file argument');
    Deno.exit(1);
  }

  if (!Deno.statSync(file).isFile) {
    console.error('invalid file path');
    Deno.exit(1);
  }

  const data = Deno.readFileSync(file);

  if (file.endsWith('.es3')) {
    try {
      const decrypted = await decrypt(data, REPO_SECRET);
      const text = JSON.stringify(
        JSON.parse(new TextDecoder().decode(decrypted)),
        null,
        2
      );
      Deno.writeFileSync(file + '.json', new TextEncoder().encode(text));
    } catch (err) {
      console.error('error decrypting save:', err);
    }
  } else if (file.endsWith('.json')) {
    try {
      const encrypted = await encrypt(data, REPO_SECRET);
      Deno.writeFileSync(file.replace(/(\.es3)?\.json$/, '.es3'), encrypted);
    } catch (err) {
      console.error('error encrypting save:', err);
    }
  } else {
    console.error('invalid file extension. Use .es3 or .json');
  }
}
