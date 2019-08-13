import { JSEncrypt } from 'jsencrypt';

const publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyaPGORSsRUC5wN6CODBp\n'
+ 'sX5e1PP8n45J+f+AK2NcRLMRQM5gPCGIv+Ol/blaqOdn4HFO6BEcMCafWCQVUwdP\n'
+ 'QzatAJ37xC74PqG/KMSCMOcZVtu2guYJgJCHLmyh2Vmks/+FLRIxxXrTVoFfg+4W\n'
+ 'rURrgo6CXTTIqbH1ImA+zoMH9g8lCEK2bBPrzm8qXbIN2Y5Q7v1oNyKoVSUOo/RN\n'
+ 'iRNHqDqELuc1EyOR/AVpL5d/CNq81I5SePW3Kc0vPohjV+95VS/qY50QGA+AAhU9\n'
+ '2Nbok8sfjid/lxQUxU6inGGvl7fj6+NMm6kO4WrkGcAwwP/YCnJ3Qoe6J3YUVO7c\n'
+ '0wIDAQAB';

const rsaEncrypt = (str) => {
	const encrypt = new JSEncrypt();
	encrypt.setPublicKey(publicKey);
	const result = encrypt.encrypt(str);
	return result;
};

export default rsaEncrypt;
