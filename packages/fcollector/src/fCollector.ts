#!/usr/bin/env node

import { fCollectorCli } from './fCollectorCli';

const fCollector = async () => {
  await fCollectorCli();
};

(async () => await fCollector())();
