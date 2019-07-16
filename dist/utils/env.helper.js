"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EnvHelper {
    static getNodeEnv() {
        return process.env.NODE_ENV || 'development';
    }
    static isProduction() {
        return process.env.NODE_ENV === 'production';
    }
    static printEnvs() {
        const envs = process.env;
        for (const envName in envs) {
            if (envs.hasOwnProperty(envName)) {
                console.log(`${envName}=${envs[envName]}`);
            }
        }
    }
    static getAllEnvs() {
        return process.env;
    }
}
exports.EnvHelper = EnvHelper;
//# sourceMappingURL=env.helper.js.map