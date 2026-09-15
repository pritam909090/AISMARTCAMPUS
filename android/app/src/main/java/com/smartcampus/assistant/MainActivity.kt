package com.smartcampus.assistant

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import com.smartcampus.assistant.theme.SmartCampusTheme
import com.smartcampus.assistant.ui.ChatScreen
import com.smartcampus.assistant.ui.ChatViewModel

class MainActivity : ComponentActivity() {

    private val chatViewModel: ChatViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            SmartCampusTheme {
                ChatScreen(viewModel = chatViewModel)
            }
        }
    }
}
