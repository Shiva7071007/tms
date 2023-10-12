import { App } from '@/app';
import { TaskRoute } from '@routes/tasks.route';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const app = new App([
  new TaskRoute(),
]);

app.listen();
