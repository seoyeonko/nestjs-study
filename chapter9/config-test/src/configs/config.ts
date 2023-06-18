import common from './common';
import local from './local';
import dev from './dev';
import prod from './prod';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';

const phase = process.env.NODE_ENV;

let conf = {};
if (phase === 'local') {
  conf = local;
} else if (phase === 'dev') {
  conf = dev;
} else if (phase === 'prod') {
  conf = prod;
}

const yamlConfig: Record<string, any> = yaml.load(
  readFileSync(`${process.cwd()}/envs/config.yaml`, 'utf8'),
);

// 공통 환경 변수 반환
// () => ({}): ConfigModule load 옵션 값의 형태
export default () => ({
  ...common,
  ...conf,
  ...yamlConfig,
});
