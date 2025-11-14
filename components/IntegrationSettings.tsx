import React, { useState } from 'react';
import { IntegrationCard } from './IntegrationCard';
import { SecureAppSwitcherIcon } from './icons/SecureAppSwitcherIcon';
import { QrScannerIcon } from './icons/QrScannerIcon';
import { AppsflyerLogo } from './icons/AppsflyerLogo';
import { GoogleSignInLogo } from './icons/GoogleSignInLogo';
import { FloatingActionButtonIcon } from './icons/FloatingActionButtonIcon';
import { FloatingSpeedDialIcon } from './icons/FloatingSpeedDialIcon';
import { BiometricAuthIcon } from './icons/BiometricAuthIcon';
import { NavigationDrawerIcon } from './icons/NavigationDrawerIcon';
import { DeepLinkIcon } from './icons/DeepLinkIcon';
import { CustomCssJsIcon } from './icons/CustomCssJsIcon';
import { AppBarIcon } from './icons/AppBarIcon';
import { SplashScreenIconSolid } from './icons/SplashScreenIconSolid';
import { FirebaseLogo } from './icons/FirebaseLogo';
import { AdmobLogo } from './icons/AdmobLogo';
import { BottomNavigationIcon } from './icons/BottomNavigationIcon';

const integrationsData = [
    { id: 'splashScreen', icon: <SplashScreenIconSolid />, title: 'Splash Screen', description: 'Set an initial screen with custom logo and background that appears when the application is launched.', defaultEnabled: true },
    { id: 'secureAppSwitcher', icon: <SecureAppSwitcherIcon />, title: 'Secure App Switcher', description: 'Protect app screen and contents by replacing with Custom image when the app is in App Switcher View.', defaultEnabled: false },
    { id: 'qrScanner', icon: <QrScannerIcon />, title: 'QR Scanner', description: 'Lets you quickly scan QR codes to access links, text, or other info instantly using your Device Camera.', defaultEnabled: false },
    { id: 'appsflyer', icon: <AppsflyerLogo />, title: 'AppsFlyer', description: 'Enables the connection to AppsFlyer, a leading SaaS mobile marketing analytics and attribution platform.', defaultEnabled: false },
    { id: 'googleSignIn', icon: <GoogleSignInLogo />, title: 'Google Sign-in', description: 'Enables native Sign-in with Google feature in the app so that users can choose their device\'s account to login with.', defaultEnabled: false },
    { id: 'floatingActionButton', icon: <FloatingActionButtonIcon />, title: 'Floating Action Button', description: 'Shows a simple floating action button in the bottom of the app to provide users a quick navigation to specific URL.', defaultEnabled: false },
    { id: 'floatingSpeedDial', icon: <FloatingSpeedDialIcon />, title: 'Floating Speed Dial', description: 'Shows an advanced floating action button in the bottom of the app to provide users a quick navigation to different URLs.', defaultEnabled: false },
    { id: 'biometricAuth', icon: <BiometricAuthIcon />, title: 'Biometric Auth', description: 'Verify device owner using Face ID or Fingerprint or Pass Lock or Pattern Lock before showing confidential content.', defaultEnabled: false },
    { id: 'navigationDrawer', icon: <NavigationDrawerIcon />, title: 'Navigation Drawer', description: 'Display a navigation drawer with quick access menu in your app to give complete flavor of real app.', defaultEnabled: false },
    { id: 'deepLink', icon: <DeepLinkIcon />, title: 'Deep Link', description: 'Automatically open the app when your website is being browsed or the website URL being clicked on other apps.', defaultEnabled: false },
    { id: 'customCssJs', icon: <CustomCssJsIcon />, title: 'Custom CSS & JS', description: 'Add custom CSS style or Javascript codes that will only work in the app to bring extra customization.', defaultEnabled: false },
    { id: 'appBar', icon: <AppBarIcon />, title: 'App Bar', description: 'Display an customizable App Bar or Toolbar at the top of your app to give complete flavor of real app.', defaultEnabled: false },
    { id: 'firebase', icon: <FirebaseLogo />, title: 'Firebase Push Notification', description: 'Integrate Firebase to send Push Notification to all app users directly from the Web to apk Control Panel.', defaultEnabled: false },
    { id: 'admob', icon: <AdmobLogo />, title: 'Google AdMob', description: 'Integrate Admob to generate revenue by displaying ads to maximize monetization opportunities from your app.', defaultEnabled: false },
    { id: 'bottomNavigation', icon: <BottomNavigationIcon />, title: 'Bottom Navigation', description: 'Display a Bottom Navigation with quick access menu in your app to give complete flavor of real app.', defaultEnabled: false },
];


const IntegrationSettings: React.FC = () => {
    const [enabledIntegrations, setEnabledIntegrations] = useState(() => {
        const initialState = {};
        integrationsData.forEach(int => {
            initialState[int.id] = int.defaultEnabled;
        });
        return initialState;
    });

    const handleToggle = (id: string) => {
        setEnabledIntegrations(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="space-y-6">
            {integrationsData.map((integration) => (
                <IntegrationCard
                    key={integration.id}
                    icon={integration.icon}
                    title={integration.title}
                    // Fix: The 'subtitle' property does not exist on the 'integration' object.
                    description={integration.description}
                    enabled={enabledIntegrations[integration.id]}
                    onToggle={() => handleToggle(integration.id)}
                />
            ))}
        </div>
    );
};

export default IntegrationSettings;