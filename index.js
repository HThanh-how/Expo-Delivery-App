import { View } from 'react-native';

import { Link } from 'expo-router';


export default function Page() {
    return (
        <View>
            <Link href="/screens/Login">Login</Link>
            {/* ...other links */}

        </View>
    );
}
