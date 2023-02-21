import * as z from 'zod';

const publicKeys = [
  'NODE_ENV',
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID',
] as const;

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  FIREBASE_API_KEY: z.string().min(1),
  FIREBASE_AUTH_DOMAIN: z.string().min(1),
  FIREBASE_PROJECT_ID: z.string().min(1),
  FIREBASE_STORAGE_BUCKET: z.string().min(1),
  FIREBASE_MESSAGING_SENDER_ID: z.string().min(1),
  FIREBASE_APP_ID: z.string().min(1),
});

type EnvironmentSchemaType = z.infer<typeof environmentSchema>;
const environment = environmentSchema.parse(process.env);

type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never;

type PublicKeysNames = ElementType<typeof publicKeys>;

function getPublicKeys() {
  return publicKeys.reduce((obj, key) => {
    if (environment && environment.hasOwnProperty(key)) {
      // @ts-ignore: Unreachable code error
      obj[key] = environment[key];
    }
    return obj;
  }, {} as Pick<EnvironmentSchemaType, PublicKeysNames>);
}

export { getPublicKeys, environment };
