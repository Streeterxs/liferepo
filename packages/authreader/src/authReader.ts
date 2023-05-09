import { watch, readFile } from 'node:fs/promises';
import { FsWatcherEvents } from './fsWatcherEvents';
import { getAttempt } from './getAttempt';

const authReader = async () => {
  const authPath = '/var/log/auth.log';
  const asyncFileWatch = watch(authPath);

  for await (const iterator of asyncFileWatch) {
    const { eventType } = iterator;
    if (eventType !== FsWatcherEvents.CHANGE) {
      break;
    }

    const fileContentBuffer = await readFile(authPath);
    const fileContent = fileContentBuffer.toString();
    const fileContentArray = fileContent.split('\n');
    const filteredFileContent = fileContentArray.filter(
      (content) => content !== ''
    );

    const lastIndexContent = filteredFileContent.length - 1;
    const lastContent = filteredFileContent[lastIndexContent];

    const attempt = getAttempt(lastContent);

    console.log({ attempt });
  }
};

(async () => await authReader())();
