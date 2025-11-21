// envVars Function
interface EnvConfig {
  backend_url: string;
}

const loadEnvs = (): EnvConfig => {
  // Check missing envs
  const requiredEnvs: string[] = ["NEXT_PUBLIC_BACKEND_URL"];

  requiredEnvs.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing the required enviroment variable : ${key}`);
    }
  });

  // Return validated envs
  return {
    backend_url: process.env.NEXT_PUBLIC_BACKEND_URL as string,
  };
};

const envVars = loadEnvs();
export default envVars;
