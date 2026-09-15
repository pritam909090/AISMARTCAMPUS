package com.smartcampus.assistant.ui

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.smartcampus.assistant.engine.CampusQueryEngine
import com.smartcampus.assistant.model.ChatMessage
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class ChatViewModel : ViewModel() {

    private val timeFormatter = SimpleDateFormat("hh:mm a", Locale.getDefault())

    private val _messages = MutableStateFlow<List<ChatMessage>>(
        listOf(
            ChatMessage(
                id = "welcome-01",
                sender = "ai",
                text = "Hello! How can I help you today?\n\nI'm your official **AI Smart Campus Student Assistant**. Ask me anything about timetables, circulars, library timings, department HODs, or upcoming exams!",
                timestamp = timeFormatter.format(Date()),
                category = "Welcome",
                quickActions = listOf("📅 Timetable", "📢 Notices", "📚 Library", "🏫 Facilities")
            )
        )
    )
    val messages: StateFlow<List<ChatMessage>> = _messages.asStateFlow()

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()

    private val _isDrawerOpen = MutableStateFlow(false)
    val isDrawerOpen: StateFlow<Boolean> = _isDrawerOpen.asStateFlow()

    fun openDrawer() {
        _isDrawerOpen.value = true
    }

    fun closeDrawer() {
        _isDrawerOpen.value = false
    }

    fun clearChat() {
        _messages.value = listOf(
            ChatMessage(
                id = "welcome-${System.currentTimeMillis()}",
                sender = "ai",
                text = "Hello! How can I help you today?",
                timestamp = timeFormatter.format(Date()),
                category = "Welcome",
                quickActions = listOf("📅 Timetable", "📢 Notices", "📚 Library", "🏫 Facilities")
            )
        )
    }

    fun sendMessage(rawText: String) {
        val trimmed = rawText.trim()
        if (trimmed.isEmpty() || _isLoading.value) return

        val studentMsg = ChatMessage(
            id = "student-${System.currentTimeMillis()}",
            sender = "student",
            text = trimmed,
            timestamp = timeFormatter.format(Date())
        )

        _messages.value = _messages.value + studentMsg
        _isLoading.value = true

        viewModelScope.launch {
            // Slight natural typing delay (250ms) for pleasant chat feel
            delay(250)
            val result = CampusQueryEngine.query(trimmed)

            val aiMsg = ChatMessage(
                id = "ai-${System.currentTimeMillis()}",
                sender = "ai",
                text = result.text,
                timestamp = timeFormatter.format(Date()),
                category = result.category,
                quickActions = result.quickActions
            )

            _messages.value = _messages.value + aiMsg
            _isLoading.value = false
        }
    }
}
