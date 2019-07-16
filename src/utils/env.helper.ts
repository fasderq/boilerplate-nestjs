import { ENV } from '@types';

export class EnvHelper {

    public static getNodeEnv(): ENV {
        return process.env.NODE_ENV as ENV || 'development';
    }

    public static isProduction(): boolean {
        return process.env.NODE_ENV === 'production';
    }

    public static printEnvs(): void {
        const envs: NodeJS.ProcessEnv = process.env;

        for (const envName in envs) {
            if (envs.hasOwnProperty(envName)) {
                console.log(`${envName}=${envs[envName]}`)
            }
        }
    }

    public static getAllEnvs(): NodeJS.ProcessEnv {
        return process.env;
    }
}
