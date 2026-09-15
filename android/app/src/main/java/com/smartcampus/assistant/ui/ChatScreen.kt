package com.smartcampus.assistant.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalClipboardManager
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.smartcampus.assistant.data.CampusData
import com.smartcampus.assistant.model.ChatMessage
import com.smartcampus.assistant.theme.*
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ChatScreen(viewModel: ChatViewModel) {
    val messages by viewModel.messages.collectAsState()
    val isLoading by viewModel.isLoading.collectAsState()
    val isDrawerOpen by viewModel.isDrawerOpen.collectAsState()

    val drawerState = rememberDrawerState(
        initialValue = if (isDrawerOpen) DrawerValue.Open else DrawerValue.Closed
    )
    val coroutineScope = rememberCoroutineScope()
    var inputText by remember { mutableStateOf("") }
    val listState = rememberLazyListState()

    // Auto-scroll on new messages
    LaunchedEffect(messages.size) {
        if (messages.isNotEmpty()) {
            listState.animateScrollToItem(messages.size - 1)
        }
    }

    ModalNavigationDrawer(
        drawerState = drawerState,
        drawerContent = {
            ModalDrawerSheet(
                modifier = Modifier.width(310.dp),
                drawerContainerColor = SurfaceWhite
            ) {
                CampusDrawerContent(
                    onSelectAction = { query ->
                        coroutineScope.launch { drawerState.close() }
                        viewModel.sendMessage(query)
                    },
                    onClose = { coroutineScope.launch { drawerState.close() } }
                )
            }
        }
    ) {
        Scaffold(
            topBar = {
                CampusTopBar(
                    onOpenDrawer = { coroutineScope.launch { drawerState.open() } },
                    onClearChat = { viewModel.clearChat() }
                )
            },
            bottomBar = {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(SurfaceWhite)
                ) {
                    QuickActionRow(
                        onSelectQuickAction = { actionQuery ->
                            viewModel.sendMessage(actionQuery)
                        }
                    )
                    CampusChatInput(
                        input = inputText,
                        onInputChange = { inputText = it },
                        isLoading = isLoading,
                        onSend = {
                            if (inputText.trim().isNotEmpty()) {
                                viewModel.sendMessage(inputText)
                                inputText = ""
                            }
                        }
                    )
                }
            },
            containerColor = BackgroundLight
        ) { paddingValues ->
            LazyColumn(
                state = listState,
                modifier = Modifier
                    .fillMaxSize()
                    .padding(paddingValues)
                    .padding(horizontal = 12.dp, vertical = 8.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                items(messages, key = { it.id }) { message ->
                    if (message.sender == "student") {
                        StudentMessageBubble(message)
                    } else {
                        AiMessageBubble(
                            message = message,
                            onQuickActionClick = { viewModel.sendMessage(it) }
                        )
                    }
                }

                if (isLoading) {
                    item {
                        TypingIndicatorBubble()
                    }
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CampusTopBar(
    onOpenDrawer: () -> Unit,
    onClearChat: () -> Unit
) {
    TopAppBar(
        title = {
            Column {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        text = "🤖 AI SMART CAMPUS",
                        fontSize = 17.sp,
                        fontWeight = FontWeight.Bold,
                        color = SurfaceWhite
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Box(
                        modifier = Modifier
                            .background(Color(0xFF22C55E), CircleShape)
                            .size(7.dp)
                    )
                }
                Text(
                    text = "Student Assistant",
                    fontSize = 12.sp,
                    color = Color(0xFFDBEAFE)
                )
            }
        },
        navigationIcon = {
            IconButton(onClick = onOpenDrawer) {
                Icon(
                    imageVector = Icons.Default.Menu,
                    contentDescription = "Open Campus Menu",
                    tint = SurfaceWhite
                )
            }
        },
        actions = {
            IconButton(onClick = onClearChat) {
                Icon(
                    imageVector = Icons.Default.DeleteOutline,
                    contentDescription = "Clear Chat",
                    tint = SurfaceWhite
                )
            }
        },
        colors = TopAppBarDefaults.topAppBarColors(
            containerColor = BluePrimary
        )
    )
}

@Composable
fun QuickActionRow(
    onSelectQuickAction: (String) -> Unit
) {
    val quickActions = listOf(
        Pair("📅 Timetable", "Show today timetable and class schedule"),
        Pair("📢 Notices", "Show latest campus notices and circulars"),
        Pair("📚 Library", "What are the central library timings and book borrowing rules?"),
        Pair("🏫 Facilities", "Show campus facilities, canteen, sports, and hostels"),
        Pair("📝 Exams", "Show upcoming exam dates and admit card information"),
        Pair("👨‍🏫 Faculty", "Show department HODs and faculty directory")
    )

    LazyRow(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 8.dp, vertical = 6.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items(quickActions) { item ->
            Surface(
                modifier = Modifier
                    .clip(RoundedCornerShape(20.dp))
                    .clickable { onSelectQuickAction(item.second) },
                color = BlueLight,
                shape = RoundedCornerShape(20.dp),
                border = null
            ) {
                Text(
                    text = item.first,
                    color = BlueDark,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Medium,
                    modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp)
                )
            }
        }
    }
}

@Composable
fun StudentMessageBubble(message: ChatMessage) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.End
    ) {
        Column(
            horizontalAlignment = Alignment.End,
            modifier = Modifier.widthIn(max = 300.dp)
        ) {
            Surface(
                color = StudentBubble,
                shape = RoundedCornerShape(topStart = 16.dp, topEnd = 4.dp, bottomStart = 16.dp, bottomEnd = 16.dp),
                shadowElevation = 1.dp
            ) {
                Text(
                    text = message.text,
                    color = StudentBubbleText,
                    fontSize = 14.sp,
                    lineHeight = 20.sp,
                    modifier = Modifier.padding(horizontal = 14.dp, vertical = 10.dp)
                )
            }
            Text(
                text = message.timestamp,
                fontSize = 10.sp,
                color = TextMuted,
                modifier = Modifier.padding(top = 2.dp, end = 4.dp)
            )
        }
    }
}

@Composable
fun AiMessageBubble(
    message: ChatMessage,
    onQuickActionClick: (String) -> Unit
) {
    val clipboardManager = LocalClipboardManager.current
    var copied by remember { mutableStateOf(false) }

    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.Start
    ) {
        Box(
            modifier = Modifier
                .size(32.dp)
                .background(BluePrimary, CircleShape),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Default.SmartToy,
                contentDescription = "AI Assistant",
                tint = SurfaceWhite,
                modifier = Modifier.size(18.dp)
            )
        }

        Spacer(modifier = Modifier.width(8.dp))

        Column(
            modifier = Modifier.widthIn(max = 320.dp)
        ) {
            Surface(
                color = AiBubble,
                shape = RoundedCornerShape(topStart = 4.dp, topEnd = 16.dp, bottomStart = 16.dp, bottomEnd = 16.dp),
                border = androidx.compose.foundation.BorderStroke(1.dp, AiBubbleBorder),
                shadowElevation = 1.dp
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    if (message.category != null) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier.padding(bottom = 6.dp)
                        ) {
                            Surface(
                                color = BlueLight,
                                shape = RoundedCornerShape(6.dp)
                            ) {
                                Text(
                                    text = message.category.uppercase(),
                                    color = BlueDark,
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.Bold,
                                    modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                                )
                            }
                        }
                    }

                    Text(
                        text = message.text,
                        color = TextPrimary,
                        fontSize = 14.sp,
                        lineHeight = 21.sp
                    )

                    // Actions bar: Copy
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(top = 8.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = message.timestamp,
                            fontSize = 10.sp,
                            color = TextMuted
                        )

                        IconButton(
                            onClick = {
                                clipboardManager.setText(AnnotatedString(message.text))
                                copied = true
                            },
                            modifier = Modifier.size(24.dp)
                        ) {
                            Icon(
                                imageVector = if (copied) Icons.Default.Check else Icons.Default.ContentCopy,
                                contentDescription = "Copy message",
                                tint = if (copied) Color(0xFF16A34A) else TextMuted,
                                modifier = Modifier.size(14.dp)
                            )
                        }
                    }
                }
            }

            // Quick suggestions below AI message
            if (message.quickActions.isNotEmpty()) {
                LazyRow(
                    modifier = Modifier.padding(top = 6.dp),
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    items(message.quickActions) { actionText ->
                        Surface(
                            modifier = Modifier
                                .clip(RoundedCornerShape(12.dp))
                                .clickable { onQuickActionClick(actionText) },
                            color = SurfaceWhite,
                            shape = RoundedCornerShape(12.dp),
                            border = androidx.compose.foundation.BorderStroke(1.dp, BlueLight)
                        ) {
                            Text(
                                text = actionText,
                                color = BluePrimary,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Medium,
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun TypingIndicatorBubble() {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.Start,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(
            modifier = Modifier
                .size(32.dp)
                .background(BluePrimary, CircleShape),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Default.SmartToy,
                contentDescription = "AI Assistant",
                tint = SurfaceWhite,
                modifier = Modifier.size(18.dp)
            )
        }
        Spacer(modifier = Modifier.width(8.dp))
        Surface(
            color = SurfaceWhite,
            shape = RoundedCornerShape(14.dp),
            border = androidx.compose.foundation.BorderStroke(1.dp, SurfaceBorder)
        ) {
            Row(
                modifier = Modifier.padding(horizontal = 12.dp, vertical = 8.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                CircularProgressIndicator(
                    modifier = Modifier.size(14.dp),
                    color = BluePrimary,
                    strokeWidth = 2.dp
                )
                Spacer(modifier = Modifier.width(4.dp))
                Text(
                    text = "AI is retrieving verified info...",
                    fontSize = 12.sp,
                    color = TextSecondary
                )
            }
        }
    }
}

@Composable
fun CampusChatInput(
    input: String,
    onInputChange: (String) -> Unit,
    isLoading: Boolean,
    onSend: () -> Unit
) {
    Surface(
        color = SurfaceWhite,
        shadowElevation = 8.dp
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 10.dp, vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            TextField(
                value = input,
                onValueChange = onInputChange,
                placeholder = {
                    Text(
                        text = "Ask about your college...",
                        fontSize = 14.sp,
                        color = TextMuted
                    )
                },
                modifier = Modifier
                    .weight(1f)
                    .clip(RoundedCornerShape(24.dp))
                    .background(Color(0xFFF1F5F9)),
                colors = TextFieldDefaults.colors(
                    focusedContainerColor = Color(0xFFF1F5F9),
                    unfocusedContainerColor = Color(0xFFF1F5F9),
                    disabledContainerColor = Color(0xFFF1F5F9),
                    focusedIndicatorColor = Color.Transparent,
                    unfocusedIndicatorColor = Color.Transparent
                ),
                maxLines = 3,
                enabled = !isLoading
            )

            Spacer(modifier = Modifier.width(8.dp))

            val isSendEnabled = input.trim().isNotEmpty() && !isLoading

            IconButton(
                onClick = onSend,
                enabled = isSendEnabled,
                modifier = Modifier
                    .size(44.dp)
                    .background(
                        if (isSendEnabled) BluePrimary else Color(0xFFE2E8F0),
                        CircleShape
                    )
            ) {
                Icon(
                    imageVector = Icons.Default.Send,
                    contentDescription = "Send Message",
                    tint = if (isSendEnabled) SurfaceWhite else Color(0xFF94A3B8),
                    modifier = Modifier.size(20.dp)
                )
            }
        }
    }
}

@Composable
fun CampusDrawerContent(
    onSelectAction: (String) -> Unit,
    onClose: () -> Unit
) {
    val college = CampusData.collegeInfo

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        // Drawer Header
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.fillMaxWidth()
        ) {
            Box(
                modifier = Modifier
                    .size(44.dp)
                    .background(BluePrimary, RoundedCornerShape(12.dp)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.School,
                    contentDescription = "College Logo",
                    tint = SurfaceWhite,
                    modifier = Modifier.size(26.dp)
                )
            }
            Spacer(modifier = Modifier.width(12.dp))
            Column {
                Text(
                    text = "AITE Campus",
                    fontWeight = FontWeight.Bold,
                    fontSize = 16.sp,
                    color = TextPrimary
                )
                Text(
                    text = college.code,
                    fontSize = 12.sp,
                    color = TextSecondary
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))
        Divider(color = SurfaceBorder)
        Spacer(modifier = Modifier.height(12.dp))

        Text(
            text = "EXPLORE CAMPUS SERVICES",
            fontSize = 11.sp,
            fontWeight = FontWeight.SemiBold,
            color = TextMuted,
            modifier = Modifier.padding(bottom = 8.dp)
        )

        val menuItems = listOf(
            Triple(Icons.Default.CalendarMonth, "Timetable & Schedule", "Show today timetable and class schedule"),
            Triple(Icons.Default.Campaign, "Campus Notices", "Show latest campus notices and circulars"),
            Triple(Icons.Default.LocalLibrary, "Central Library", "What are the central library timings and book borrowing rules?"),
            Triple(Icons.Default.Domain, "Campus Facilities", "Show campus facilities, canteen, sports, and hostels"),
            Triple(Icons.Default.People, "Faculty Directory", "Show department HODs and faculty directory"),
            Triple(Icons.Default.School, "Academic Departments", "Show academic departments and intake"),
            Triple(Icons.Default.Assignment, "Exams & Admit Cards", "Show upcoming exam dates and admit card information"),
            Triple(Icons.Default.Handyman, "Student Services", "Show student administrative services and procedures"),
            Triple(Icons.Default.Phone, "Campus Contacts", "Show key campus contacts and emergency numbers")
        )

        LazyColumn(
            modifier = Modifier.weight(1f),
            verticalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            items(menuItems) { item ->
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(8.dp))
                        .clickable { onSelectAction(item.third) }
                        .padding(horizontal = 10.dp, vertical = 10.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = item.first,
                        contentDescription = null,
                        tint = BluePrimary,
                        modifier = Modifier.size(20.dp)
                    )
                    Spacer(modifier = Modifier.width(12.dp))
                    Text(
                        text = item.second,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Medium,
                        color = TextPrimary
                    )
                }
            }
        }

        Divider(color = SurfaceBorder)
        Spacer(modifier = Modifier.height(10.dp))
        Text(
            text = "Apex Institute of Technology & Eng.\nHelpline: +91-22-2890-4000",
            fontSize = 11.sp,
            color = TextMuted,
            lineHeight = 16.sp
        )
    }
}
