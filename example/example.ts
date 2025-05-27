import { sign, verify, decode } from '../src';

const key = 'secret';

const token = sign(
    {
        data: [
            {
                user_id: 0,

                u_id: `0`,

                email: `app@lcapis.app`,

                roles: JSON.stringify(['APP']),
            },
        ],
        iss: "example.org",
        aud: "example.org",
        exp: Math.floor(Date.now() / 1000) + 60,
        nbf: Math.floor(Date.now() / 1000) + 30,
    }, key);

console.log('Signed JWT:', token);

const verified = verify(token, key);
console.log('Verified Payload:', verified);

const decoded = decode(token);
console.log('Decoded (unverified):', decoded);
