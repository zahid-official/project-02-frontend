// envVars Function
interface EnvConfig {
  backend_url: string;
  jwt: {
    access_secret: string;
    access_expiresin: string;
  };
}

const loadEnvs = (): EnvConfig => {
  // Check missing envs
  const requiredEnvs: string[] = [
    "NEXT_PUBLIC_BACKEND_URL",
    "JWT_ACCESS_TOKEN_SECRET",
    "JWT_ACCESS_TOKEN_EXPIRESIN",
  ];

  requiredEnvs.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing the required enviroment variable : ${key}`);
    }
  });

  // Return validated envs
  return {
    backend_url: process.env.NEXT_PUBLIC_BACKEND_URL as string,
    jwt: {
      access_secret: process.env.JWT_ACCESS_TOKEN_SECRET as string,
      access_expiresin: process.env.JWT_ACCESS_TOKEN_EXPIRESIN as string,
    },
  };
};

const envVars = loadEnvs();
export default envVars;
