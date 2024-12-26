# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# Keep the class and members for React Native
-keep class com.facebook.react.** { *; }
-keep class com.facebook.** { *; }
-dontwarn com.facebook.**

# Keep the class and members for OkHttp
-keep class okhttp3.** { *; }
-dontwarn okhttp3.**

# Keep the class and members for Retrofit
-keep class retrofit2.** { *; }
-dontwarn retrofit2.**

# Keep the class and members for other necessary libraries
-keep class com.google.android.** { *; }
-dontwarn com.google.android.**
