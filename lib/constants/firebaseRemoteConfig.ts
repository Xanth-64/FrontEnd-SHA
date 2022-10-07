import { FirebaseApp } from 'firebase/app';
import {
  RemoteConfig,
  fetchAndActivate,
  getRemoteConfig,
  getValue,
} from 'firebase/remote-config';

const generateRemoteConfig = (firebaseApp: FirebaseApp): RemoteConfig => {
  const firebaseRemoteConfig = getRemoteConfig(firebaseApp);
  firebaseRemoteConfig.settings.minimumFetchIntervalMillis =
    process.env.NEXT_PUBLIC_ENV_NAME === 'development' ? 5000 : 21600000;
  console.log(
    'Teacher Manual',
    getValue(firebaseRemoteConfig, 'teacher_manual').asString()
  );
  firebaseRemoteConfig.defaultConfig = {
    student_manual: '',
    teacher_manual: '',
  };
  fetchAndActivate(firebaseRemoteConfig);
  return firebaseRemoteConfig;
};

export default generateRemoteConfig;
