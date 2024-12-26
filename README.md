--SetUp Steps---



         1 step. -- init application using this cmd "npx react-native init AppName",
         2 step. -- for Run Application in react-native using this cmd "npx react-native run-android",
         3 step. -- for Design Edit in File Name "app.js" or "app.tsx",
         4 step. -- Design 'Performance Metrics' page using JSX, and styled App UI using React-Native "stylesheet",
         5 step. -- Manage state using UseState hook from "react",
         6 step. -- for Animation View using 'Animated' from "React-Native",
         7 step. -- for Store User Data. install '@react-native-async-storage/async-storage', using 'AsyncStorage' from "@react-native-async-storage/async-storage",
 


--App Working Steps--



         1 . first time Maximum Strength & Maximum Speed == 0,
         2 . when user Input Number in 'Maximum Strength & Maximum Speed' TextInput Box then. onChangeText value store in useState, 
         3 . button onPress Save 'Maximum Strength & Maximum Speed' both value in localstorage using setItem 'key and Value',
      
               keys :

                     const STRENGTH_KEY = '@performance_strength';
                     const SPEED_KEY = '@performance_speed';

               value :
                     
                     const [strength, setStrength] = useState('');
                     const [speed, setSpeed] = useState('');
           
         4 . on reStart Application getItem from localstorage keyName,
         5 . if (value) then. setState(value),
         6 . add validation for blank or 0 value in inputBok,
         7 . when value successfully added ProgressBar Get expend According to Value,

--Instructions to generate the production-ready APK..--

           1 . Create a Keystore
               using this cmd --- 
               keytool -genkeypair -v -storetype PKCS12 -keyalg RSA -keysize 2048 -validity 10000 -keystore my-upload-key.keystore -alias my-key-alias

            
           2 . Place the Keystore in Your Project:
               using this location ---
               android/app
               android

           3 .  Update build.gradle 

               Open.. android/app/build.gradle and add the following configuration inside the android block:  ---
               ...
               android {
                  ...
                  defaultConfig { ... }
                  signingConfigs {
                     release {
                           if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                              storeFile file(MYAPP_UPLOAD_STORE_FILE)
                              storePassword MYAPP_UPLOAD_STORE_PASSWORD
                              keyAlias MYAPP_UPLOAD_KEY_ALIAS
                              keyPassword MYAPP_UPLOAD_KEY_PASSWORD
                           }
                     }
                  }
                  buildTypes {
                     release {
                           ...
                           signingConfig signingConfigs.release
                     }
                  }
               }
            
          4 . Add some line. in gradle.properties
               MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
               MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
               MYAPP_UPLOAD_STORE_PASSWORD=password
               MYAPP_UPLOAD_KEY_PASSWORD=password

         5 . Build the APK For Testing
               using this cmd 
               cd android
               ./gradlew assembleRelease

         6 . ABB for Upload on Playstore.
               using this cmd 
               ./gradlew bundleRelease

         7. Locate the Output:
               for APK this cmd */-- android/app/build/outputs/apk/release --\*
               for ABB this cmd */-- android/app/build/outputs/bundle/release --\*
