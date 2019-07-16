"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("@app/constants");
const fs_1 = require("fs");
const js_yaml_1 = require("js-yaml");
const ejs_1 = require("ejs");
class ConfigService {
    constructor(path = constants_1.DefaultConfigPath) {
        this.path = path;
        this.applicationOptions = this.loadApplicationOptions();
    }
    loadApplicationOptions() {
        return js_yaml_1.safeLoad(ejs_1.render(fs_1.readFileSync(this.path, { encoding: 'utf8' }), { env: process.env }));
    }
    getApplicationOptions() {
        return this.applicationOptions;
    }
    createTypeOrmOptions() {
        const { databaseOptions: { host, port, username, password, database, } } = this.applicationOptions;
        return {
            type: 'postgres',
            host,
            port,
            username,
            password,
            database,
            entities: ['./src/entities/*.entity{.ts,.js}'],
            logging: true,
            synchronize: true,
        };
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map