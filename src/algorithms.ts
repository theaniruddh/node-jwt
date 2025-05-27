import { createHmac, createSign, createVerify } from 'crypto';

function signHS256(data: string, secret: string): string {
    return createHmac('sha256', secret).update(data).digest('base64url');
}

function verifyHS256(data: string, secret: string, signature: string): boolean {
    return signHS256(data, secret) === signature;
}

function signRS256(data: string, privateKey: string): string {
    return createSign('RSA-SHA256').update(data).sign(privateKey, 'base64url');
}

function verifyRS256(data: string, publicKey: string, signature: string): boolean {
    return createVerify('RSA-SHA256').update(data).verify(publicKey, signature, 'base64url');
}

export {
    signHS256,
    verifyHS256,
    signRS256,
    verifyRS256,
}