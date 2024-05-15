import PlatformPeg from 'matrix-react-sdk/lib/PlatformPeg';
import BasePlatform from 'matrix-react-sdk/lib/BasePlatform';
import SettingsStore from 'matrix-react-sdk/lib/settings/SettingsStore';
 
// Configuración básica de matrix-react-sdk
const configureMatrixReactSdk = () => {
    PlatformPeg.set(new BasePlatform());
    SettingsStore.setValue('welcomeUserId', null, 'config', '@element:matrix.org');
};

export default configureMatrixReactSdk;