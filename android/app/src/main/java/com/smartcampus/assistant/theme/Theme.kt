package com.smartcampus.assistant.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable

private val LightColorScheme = lightColorScheme(
    primary = BluePrimary,
    onPrimary = SurfaceWhite,
    primaryContainer = BlueLight,
    onPrimaryContainer = BlueDark,
    secondary = BlueAccent,
    background = BackgroundLight,
    surface = SurfaceWhite,
    onSurface = TextPrimary,
    outline = SurfaceBorder
)

@Composable
fun SmartCampusTheme(
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = LightColorScheme,
        content = content
    )
}
