console.log("AI Reply by Roch - Content Script Loaded");

// Function to generate AI reply using your Spring Boot backend
async function generateAIReply(originalEmail, tone = "professional") {
    try {
        const response = await fetch('https://email-reply-generator-nuxc.onrender.com/api/email/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emailContent: originalEmail,
                tone: tone
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const aiReply = await response.text();
        return aiReply;
    } catch (error) {
        console.error('Error generating AI reply:', error);
        // Fallback to sample replies if backend is not available
        const sampleReplies = [
            "Thank you for your email. I appreciate you reaching out and will get back to you soon with a detailed response.",
            "I received your message and will review it carefully. Please expect a response within 24 hours.",
            "Thank you for contacting me. I'm currently reviewing your request and will provide a comprehensive reply shortly.",
            "I appreciate your email. Let me look into this matter and get back to you with the information you need.",
            "Thank you for reaching out. I'll need some time to review your request and will respond with a detailed answer soon."
        ];
        return sampleReplies[Math.floor(Math.random() * sampleReplies.length)];
    }
}

// Removed injectAIButton function - we only use floating button now

// Function to handle AI button click
async function handleAIButtonClick() {
    console.log("AI Reply button clicked");
    
    const floatingButton = document.querySelector('#ai-floating-button');
    
    // Add loading state to floating button
    if (floatingButton) {
        floatingButton.classList.add('loading');
        floatingButton.style.pointerEvents = 'none';
        
        // Get current position to maintain it
        const buttonContainer = floatingButton.querySelector('#ai-button-container');
        const currentStyle = buttonContainer ? window.getComputedStyle(buttonContainer) : null;
        
        let topPos = '20px';
        let rightPos = '20px';
        let leftPos = 'auto';
        
        if (currentStyle) {
            if (currentStyle.left !== 'auto' && currentStyle.left !== '') {
                leftPos = currentStyle.left;
                rightPos = 'auto';
            } else {
                rightPos = currentStyle.right;
            }
            topPos = currentStyle.top;
        }
        
        // Update floating button content to show spinner
        floatingButton.innerHTML = `
            <div id="ai-button-container" style="
                position: fixed !important;
                top: ${topPos} !important;
                right: ${rightPos} !important;
                left: ${leftPos} !important;
                background: linear-gradient(135deg, #9aa0a6 0%, #5f6368 100%) !important;
                color: white !important;
                border: none !important;
                border-radius: 8px !important;
                padding: 12px 20px !important;
                cursor: not-allowed !important;
                font-family: 'Google Sans', Roboto, Arial, sans-serif !important;
                font-size: 14px !important;
                font-weight: 500 !important;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
                z-index: 999999 !important;
                display: flex !important;
                align-items: center !important;
                gap: 8px !important;
                user-select: none !important;
                min-width: 200px !important;
            ">
                <span style="font-size: 16px; animation: spin 1s linear infinite; display: inline-block;">⟳</span>
                <span>Generating AI reply...</span>
            </div>
        `;
    }
    
    try {
        // Find the email compose area
        const composeArea = document.querySelector('[role="textbox"]') ||
                           document.querySelector('.Am') ||
                           document.querySelector('[contenteditable="true"]');
        
        if (composeArea) {
            // Get the original email content (if available)
            const originalEmail = getOriginalEmailContent();
            
            // Get the selected tone
            const selectedTone = getSelectedTone();
            
            // Generate AI reply using the backend with selected tone
            const aiReply = await generateAIReply(originalEmail, selectedTone);
            
            // Format the AI reply with proper line breaks
            const formattedReply = formatEmailReply(aiReply);
            
            // Insert the formatted AI reply into the compose area
            // Use a method that works with Gmail's rich text editor
            insertFormattedText(composeArea, formattedReply);
            
            // Trigger input event to notify Gmail
            composeArea.dispatchEvent(new Event('input', { bubbles: true }));
            
            console.log("AI reply inserted:", aiReply);
            
            // Show success state briefly
            if (floatingButton) {
                floatingButton.classList.remove('loading');
                floatingButton.classList.add('success');
                
                // Get current position to maintain it
                const buttonContainer = floatingButton.querySelector('#ai-button-container');
                const currentStyle = buttonContainer ? window.getComputedStyle(buttonContainer) : null;
                
                let topPos = '20px';
                let rightPos = '20px';
                let leftPos = 'auto';
                
                if (currentStyle) {
                    if (currentStyle.left !== 'auto' && currentStyle.left !== '') {
                        leftPos = currentStyle.left;
                        rightPos = 'auto';
                    } else {
                        rightPos = currentStyle.right;
                    }
                    topPos = currentStyle.top;
                }
                
                // Show success state
                floatingButton.innerHTML = `
                    <div id="ai-button-container" style="
                        position: fixed !important;
                        top: ${topPos} !important;
                        right: ${rightPos} !important;
                        left: ${leftPos} !important;
                        background: linear-gradient(135deg, #34a853 0%, #137333 100%) !important;
                        color: white !important;
                        border: none !important;
                        border-radius: 8px !important;
                        padding: 12px 20px !important;
                        cursor: pointer !important;
                        font-family: 'Google Sans', Roboto, Arial, sans-serif !important;
                        font-size: 14px !important;
                        font-weight: 500 !important;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
                        z-index: 999999 !important;
                        display: flex !important;
                        align-items: center !important;
                        gap: 8px !important;
                        user-select: none !important;
                        min-width: 200px !important;
                    ">
                        <span style="font-size: 16px;">✅</span>
                        <span>Reply generated!</span>
                    </div>
                `;
                setTimeout(() => {
                    floatingButton.classList.remove('success');
                    floatingButton.style.pointerEvents = 'auto';
                    // Restore full button functionality
                    restoreFullButton(floatingButton);
                }, 2000);
            }
        } else {
            console.log("Could not find compose area");
            if (floatingButton) {
                floatingButton.classList.remove('loading');
                floatingButton.classList.add('error');
                
                // Get current position to maintain it
                const buttonContainer = floatingButton.querySelector('#ai-button-container');
                const currentStyle = buttonContainer ? window.getComputedStyle(buttonContainer) : null;
                
                let topPos = '20px';
                let rightPos = '20px';
                let leftPos = 'auto';
                
                if (currentStyle) {
                    if (currentStyle.left !== 'auto' && currentStyle.left !== '') {
                        leftPos = currentStyle.left;
                        rightPos = 'auto';
                    } else {
                        rightPos = currentStyle.right;
                    }
                    topPos = currentStyle.top;
                }
                
                // Show error state
                floatingButton.innerHTML = `
                    <div id="ai-button-container" style="
                        position: fixed !important;
                        top: ${topPos} !important;
                        right: ${rightPos} !important;
                        left: ${leftPos} !important;
                        background: linear-gradient(135deg, #ea4335 0%, #d33b2c 100%) !important;
                        color: white !important;
                        border: none !important;
                        border-radius: 8px !important;
                        padding: 12px 20px !important;
                        cursor: pointer !important;
                        font-family: 'Google Sans', Roboto, Arial, sans-serif !important;
                        font-size: 14px !important;
                        font-weight: 500 !important;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
                        z-index: 999999 !important;
                        display: flex !important;
                        align-items: center !important;
                        gap: 8px !important;
                        user-select: none !important;
                        min-width: 200px !important;
                    ">
                        <span style="font-size: 16px;">❌</span>
                        <span>Error - Try again</span>
                    </div>
                `;
                setTimeout(() => {
                    floatingButton.classList.remove('error');
                    floatingButton.style.pointerEvents = 'auto';
                    // Restore full button functionality
                    restoreFullButton(floatingButton);
                }, 2000);
            }
        }
    } catch (error) {
        console.error("Error in handleAIButtonClick:", error);
        if (floatingButton) {
            floatingButton.classList.remove('loading');
            floatingButton.classList.add('error');
            
            // Get current position to maintain it
            const buttonContainer = floatingButton.querySelector('#ai-button-container');
            const currentStyle = buttonContainer ? window.getComputedStyle(buttonContainer) : null;
            
            let topPos = '20px';
            let rightPos = '20px';
            let leftPos = 'auto';
            
            if (currentStyle) {
                if (currentStyle.left !== 'auto' && currentStyle.left !== '') {
                    leftPos = currentStyle.left;
                    rightPos = 'auto';
                } else {
                    rightPos = currentStyle.right;
                }
                topPos = currentStyle.top;
            }
            
            // Show error state
            floatingButton.innerHTML = `
                <div id="ai-button-container" style="
                    position: fixed !important;
                    top: ${topPos} !important;
                    right: ${rightPos} !important;
                    left: ${leftPos} !important;
                    background: linear-gradient(135deg, #ea4335 0%, #d33b2c 100%) !important;
                    color: white !important;
                    border: none !important;
                    border-radius: 8px !important;
                    padding: 12px 20px !important;
                    cursor: pointer !important;
                    font-family: 'Google Sans', Roboto, Arial, sans-serif !important;
                    font-size: 14px !important;
                    font-weight: 500 !important;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
                    z-index: 999999 !important;
                    display: flex !important;
                    align-items: center !important;
                    gap: 8px !important;
                    user-select: none !important;
                    min-width: 200px !important;
                ">
                    <span style="font-size: 16px;">❌</span>
                    <span>Error - Try again</span>
                </div>
            `;
            setTimeout(() => {
                floatingButton.classList.remove('error');
                floatingButton.style.pointerEvents = 'auto';
                // Restore full button functionality
                restoreFullButton(floatingButton);
            }, 2000);
        }
    }
}

// Function to insert formatted text into Gmail's compose area
function insertFormattedText(composeArea, text) {
    // Get existing content to preserve signature
    const existingContent = composeArea.innerHTML;
    
    // Detect if there's existing content that might be a signature
    const hasExistingContent = existingContent.trim() !== '' && 
                              existingContent !== '<br>' && 
                              existingContent !== '<div><br></div>';
    
    // Split text into lines
    const lines = text.split('\n');
    
    // Create a document fragment to build the AI reply content
    const aiReplyFragment = document.createDocumentFragment();
    
    lines.forEach((line, index) => {
        if (line.trim() === '') {
            // Empty line - create a paragraph break
            const br = document.createElement('br');
            aiReplyFragment.appendChild(br);
        } else {
            // Non-empty line
            const p = document.createElement('div');
            p.textContent = line;
            p.style.marginBottom = '8px';
            
            // Add bold formatting for greetings and closings
            if (line.match(/^(Bonjour|Hello|Hi|Dear|Chers)/i)) {
                p.style.fontWeight = 'bold';
            }
            if (line.match(/(Cordialement|Sincerely|Best regards|Thanks|Chers)/i)) {
                p.style.fontWeight = 'bold';
                p.style.marginTop = '16px';
            }
            
            aiReplyFragment.appendChild(p);
        }
    });
    
    // Clear the compose area
    composeArea.innerHTML = '';
    
    // Insert AI reply first
    composeArea.appendChild(aiReplyFragment);
    
    // If there was existing content (signature), add it after the AI reply
    if (hasExistingContent) {
        // Add some spacing between AI reply and signature
        const spacer = document.createElement('div');
        spacer.style.marginTop = '16px';
        spacer.style.marginBottom = '8px';
        composeArea.appendChild(spacer);
        
        // Add the existing content (signature)
        const signatureDiv = document.createElement('div');
        signatureDiv.innerHTML = existingContent;
        composeArea.appendChild(signatureDiv);
    }
    
    // Focus the compose area
    composeArea.focus();
}

// Function to format email reply with proper line breaks and structure
function formatEmailReply(reply) {
    if (!reply) return "";
    
    // Replace \n with actual line breaks for Gmail compatibility
    let formatted = reply
        .replace(/\\n/g, '\n')  // Replace escaped newlines
        .replace(/\n\n/g, '\n\n')  // Keep double newlines for paragraph breaks
        .replace(/\n/g, '\n')  // Keep single newlines
        .trim();
    
    // Add proper spacing for common email patterns
    formatted = formatted
        .replace(/^(Bonjour|Hello|Hi|Dear|Chers)/i, '$1')  // Keep greetings
        .replace(/(Cordialement|Sincerely|Best regards|Thanks)/i, '\n\n$1')  // Add spacing before closings
        .replace(/([.!?])\s*([A-Z])/g, '$1\n\n$2');  // Add breaks after sentences that start new paragraphs
    
    return formatted;
}

// Function to extract original email content
function getOriginalEmailContent() {
    // Try to find the original email content in the thread
    const emailContent = document.querySelector('.ii.gt') ||
                        document.querySelector('.a3s') ||
                        document.querySelector('[data-message-id]');
    
    return emailContent ? emailContent.textContent : "";
}

// MutationObserver to watch for DOM changes - only for floating button management
const observer = new MutationObserver((mutations) => {
    // Only check for changes that might affect our button visibility
    let shouldCheck = false;
    
    for (const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElements = addedNodes.some(node => 
            node.nodeType === Node.ELEMENT_NODE && 
            (node.matches && (
                node.matches('[role="dialog"]') ||
                node.matches('.aDh') ||
                node.matches('.btC')
            )) ||
            node.querySelector && (
                node.querySelector('[role="dialog"]') ||
                node.querySelector('.aDh') ||
                node.querySelector('.btC')
            )
        );
        
        if (hasComposeElements) {
            shouldCheck = true;
            break;
        }
    }
    
    if (shouldCheck) {
        console.log("Compose elements detected, checking button visibility...");
        setTimeout(() => {
            manageButtonVisibility();
        }, 100);
    }
});

// Start observing
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Alternative approach: Create a floating button
function createFloatingButton() {
    if (document.querySelector('#ai-floating-button')) return;
    
    // Check if we're in a reply/compose context
    if (!isInReplyContext()) {
        console.log("Not in reply context, skipping button creation");
        return;
    }
    
    const floatingButton = document.createElement('div');
    floatingButton.id = 'ai-floating-button';
    
    // Get saved position from localStorage
    const savedPosition = localStorage.getItem('ai-button-position');
    let topPos = '20px';
    let rightPos = '20px';
    let leftPos = 'auto';
    
    if (savedPosition) {
        const position = JSON.parse(savedPosition);
        topPos = position.top;
        if (position.right && position.right !== 'auto') {
            rightPos = position.right;
            leftPos = 'auto';
        } else if (position.left) {
            leftPos = position.left;
            rightPos = 'auto';
        }
    }
    
    floatingButton.innerHTML = `
        <div id="ai-button-container" style="
            position: fixed !important;
            top: ${topPos} !important;
            right: ${rightPos} !important;
            left: ${leftPos} !important;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
            color: white !important;
            border: none !important;
            border-radius: 8px !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
            z-index: 999999 !important;
            user-select: none !important;
            min-width: 50px !important;
            transition: all 0.3s ease !important;
        ">
            <!-- Drag Handle -->
            <div id="drag-handle" style="
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                width: 20px !important;
                height: 100% !important;
                background: rgba(255, 255, 255, 0.1) !important;
                border-radius: 8px 0 0 8px !important;
                cursor: move !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                font-size: 12px !important;
            ">
                ⋮⋮
            </div>
            
            <!-- Expand/Collapse Button -->
            <div id="expand-button" style="
                position: absolute !important;
                top: 0 !important;
                right: 0 !important;
                width: 20px !important;
                height: 100% !important;
                background: rgba(255, 255, 255, 0.1) !important;
                border-radius: 0 8px 8px 0 !important;
                cursor: pointer !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                font-size: 12px !important;
                font-weight: bold !important;
            ">
                +
            </div>
            
            <!-- Main Content Area -->
            <div id="main-content" style="
                padding: 12px 30px 12px 30px !important;
                font-family: 'Google Sans', Roboto, Arial, sans-serif !important;
                font-size: 14px !important;
                font-weight: 500 !important;
                display: flex !important;
                align-items: center !important;
                gap: 8px !important;
                cursor: pointer !important;
            ">
                <span style="font-size: 16px;">🤖</span>
                <span id="button-text">AI Reply by Roch</span>
                <div id="tone-selector" style="
                    margin-left: 8px !important;
                    background: rgba(255, 255, 255, 0.2) !important;
                    border: none !important;
                    border-radius: 4px !important;
                    color: white !important;
                    padding: 4px 8px !important;
                    font-size: 12px !important;
                    cursor: pointer !important;
                ">
                    <select id="tone-dropdown" style="
                        background: transparent !important;
                        border: none !important;
                        color: white !important;
                        font-size: 12px !important;
                        cursor: pointer !important;
                        outline: none !important;
                    ">
                        <option value="professional" style="color: #333;">Professional</option>
                        <option value="friendly" style="color: #333;">Friendly</option>
                        <option value="formal" style="color: #333;">Formal</option>
                        <option value="casual" style="color: #333;">Casual</option>
                        <option value="polite" style="color: #333;">Polite</option>
                    </select>
                </div>
            </div>
        </div>
    `;
    
    // Make the button draggable (only the drag handle)
    makeDraggable(floatingButton);
    
    // Add expand/collapse functionality
    addExpandCollapseFunctionality(floatingButton);
    
    // Add click handler for the main content (not the dropdown or handles)
    const mainContent = floatingButton.querySelector('#main-content');
    mainContent.addEventListener('click', function(e) {
        // Don't trigger if clicking on dropdown elements
        if (e.target.id === 'tone-dropdown' || e.target.id === 'tone-selector' || 
            e.target.tagName === 'SELECT' || e.target.tagName === 'OPTION') {
            return;
        }
        
        handleAIButtonClick();
    });
    
    document.body.appendChild(floatingButton);
    console.log("Floating AI button created with separate drag handle and expand/collapse functionality");
}

// Function to check if we're in a reply/compose context
function isInReplyContext() {
    // Check for compose/reply elements
    const composeArea = document.querySelector('[role="textbox"]') ||
                       document.querySelector('.Am') ||
                       document.querySelector('[contenteditable="true"]');
    
    const sendButton = document.querySelector('[data-tooltip*="Send"]') ||
                      document.querySelector('[data-tooltip*="Envoyer"]') ||
                      document.querySelector('[aria-label*="Send"]') ||
                      document.querySelector('[aria-label*="Envoyer"]');
    
    // Check if compose area is actually visible and interactive
    const isComposeVisible = composeArea && 
                            composeArea.offsetParent !== null && 
                            !composeArea.hidden &&
                            composeArea.style.display !== 'none' &&
                            composeArea.style.visibility !== 'hidden';
    
    // Check if we're in a compose window (not just inbox)
    const composeWindow = document.querySelector('[role="dialog"]') ||
                         document.querySelector('.aDh') ||
                         document.querySelector('.btC');
    
    const isComposeWindowVisible = composeWindow && 
                                  composeWindow.offsetParent !== null &&
                                  !composeWindow.hidden;
    
    // Check if we're in a compose URL (optional, not required)
    const isComposeURL = window.location.href.includes('compose') || 
                        window.location.href.includes('reply') ||
                        window.location.href.includes('forward');
    
    // We're in reply context if we have a visible compose area and send button
    // OR if we're in a compose URL with visible compose area
    const inReplyContext = (isComposeVisible && sendButton) || 
                          (isComposeURL && isComposeVisible);
    
    console.log("Reply context check:", {
        isComposeURL: isComposeURL,
        composeArea: !!composeArea,
        isComposeVisible: isComposeVisible,
        composeWindow: !!composeWindow,
        isComposeWindowVisible: isComposeWindowVisible,
        sendButton: !!sendButton,
        inReplyContext: inReplyContext
    });
    
    return inReplyContext;
}

// Function to manage button visibility based on context
function manageButtonVisibility() {
    const existingButton = document.querySelector('#ai-floating-button');
    
    if (isInReplyContext()) {
        if (!existingButton) {
            createFloatingButton();
        }
    } else {
        if (existingButton) {
            existingButton.remove();
            console.log("Button removed - not in reply context");
        }
    }
}

// Try the floating button approach
setTimeout(() => {
    console.log("Creating floating button...");
    manageButtonVisibility();
}, 2000);

// Check button visibility periodically
setInterval(() => {
    manageButtonVisibility();
}, 3000);

// Function to make the button draggable (only via drag handle)
function makeDraggable(element) {
    let isDragging = false;
    let startX;
    let startY;
    let initialX;
    let initialY;
    
    const buttonContainer = element.querySelector('#ai-button-container');
    const dragHandle = element.querySelector('#drag-handle');
    
    // Remove any existing event listeners to prevent duplicates
    dragHandle.removeEventListener('mousedown', dragStart);
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', dragEnd);
    
    dragHandle.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
    
    function dragStart(e) {
        isDragging = true;
        dragHandle.style.cursor = 'grabbing';
        
        // Get initial position
        const rect = buttonContainer.getBoundingClientRect();
        initialX = rect.left;
        initialY = rect.top;
        
        // Get mouse position relative to button
        startX = e.clientX - initialX;
        startY = e.clientY - initialY;
        
        e.preventDefault();
        e.stopPropagation();
    }
    
    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            e.stopPropagation();
            
            // Calculate new position
            const newX = e.clientX - startX;
            const newY = e.clientY - startY;
            
            // Keep button within viewport bounds
            const maxX = window.innerWidth - buttonContainer.offsetWidth;
            const maxY = window.innerHeight - buttonContainer.offsetHeight;
            
            const clampedX = Math.max(0, Math.min(newX, maxX));
            const clampedY = Math.max(0, Math.min(newY, maxY));
            
            // Update position
            buttonContainer.style.left = clampedX + 'px';
            buttonContainer.style.top = clampedY + 'px';
            buttonContainer.style.right = 'auto';
        }
    }
    
    function dragEnd(e) {
        if (isDragging) {
            isDragging = false;
            dragHandle.style.cursor = 'move';
            
            // Save position to localStorage
            const rect = buttonContainer.getBoundingClientRect();
            const position = {
                top: rect.top + 'px',
                right: 'auto',
                left: rect.left + 'px'
            };
            localStorage.setItem('ai-button-position', JSON.stringify(position));
            
            e.preventDefault();
            e.stopPropagation();
        }
    }
}

// Function to add expand/collapse functionality
function addExpandCollapseFunctionality(element) {
    const expandButton = element.querySelector('#expand-button');
    const mainContent = element.querySelector('#main-content');
    const buttonText = element.querySelector('#button-text');
    const toneSelector = element.querySelector('#tone-selector');
    const buttonContainer = element.querySelector('#ai-button-container');
    
    let isExpanded = true; // Start expanded
    
    expandButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        isExpanded = !isExpanded;
        
        if (isExpanded) {
            // Expand: show full content
            expandButton.textContent = '+';
            buttonText.style.display = 'inline';
            toneSelector.style.display = 'block';
            mainContent.style.padding = '12px 30px 12px 30px';
            buttonContainer.style.minWidth = '200px';
        } else {
            // Collapse: show only icon
            expandButton.textContent = '−';
            buttonText.style.display = 'none';
            toneSelector.style.display = 'none';
            mainContent.style.padding = '12px 30px 12px 30px';
            buttonContainer.style.minWidth = '50px';
        }
    });
}

// Function to get selected tone
function getSelectedTone() {
    const toneDropdown = document.querySelector('#tone-dropdown');
    return toneDropdown ? toneDropdown.value : 'professional';
}

// Function to restore full button functionality
function restoreFullButton(floatingButton) {
    // Get current position to maintain it
    const buttonContainer = floatingButton.querySelector('#ai-button-container');
    const currentStyle = buttonContainer ? window.getComputedStyle(buttonContainer) : null;
    
    let topPos = '20px';
    let rightPos = '20px';
    let leftPos = 'auto';
    
    if (currentStyle) {
        if (currentStyle.left !== 'auto' && currentStyle.left !== '') {
            leftPos = currentStyle.left;
            rightPos = 'auto';
        } else {
            rightPos = currentStyle.right;
        }
        topPos = currentStyle.top;
    }
    
    floatingButton.innerHTML = `
        <div id="ai-button-container" style="
            position: fixed !important;
            top: ${topPos} !important;
            right: ${rightPos} !important;
            left: ${leftPos} !important;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
            color: white !important;
            border: none !important;
            border-radius: 8px !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
            z-index: 999999 !important;
            user-select: none !important;
            min-width: 50px !important;
            transition: all 0.3s ease !important;
        ">
            <!-- Drag Handle -->
            <div id="drag-handle" style="
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                width: 20px !important;
                height: 100% !important;
                background: rgba(255, 255, 255, 0.1) !important;
                border-radius: 8px 0 0 8px !important;
                cursor: move !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                font-size: 12px !important;
            ">
                ⋮⋮
            </div>
            
            <!-- Expand/Collapse Button -->
            <div id="expand-button" style="
                position: absolute !important;
                top: 0 !important;
                right: 0 !important;
                width: 20px !important;
                height: 100% !important;
                background: rgba(255, 255, 255, 0.1) !important;
                border-radius: 0 8px 8px 0 !important;
                cursor: pointer !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                font-size: 12px !important;
                font-weight: bold !important;
            ">
                +
            </div>
            
            <!-- Main Content Area -->
            <div id="main-content" style="
                padding: 12px 30px 12px 30px !important;
                font-family: 'Google Sans', Roboto, Arial, sans-serif !important;
                font-size: 14px !important;
                font-weight: 500 !important;
                display: flex !important;
                align-items: center !important;
                gap: 8px !important;
                cursor: pointer !important;
            ">
                <span style="font-size: 16px;">🤖</span>
                <span id="button-text">AI Reply by Roch</span>
                <div id="tone-selector" style="
                    margin-left: 8px !important;
                    background: rgba(255, 255, 255, 0.2) !important;
                    border: none !important;
                    border-radius: 4px !important;
                    color: white !important;
                    padding: 4px 8px !important;
                    font-size: 12px !important;
                    cursor: pointer !important;
                ">
                    <select id="tone-dropdown" style="
                        background: transparent !important;
                        border: none !important;
                        color: white !important;
                        font-size: 12px !important;
                        cursor: pointer !important;
                        outline: none !important;
                    ">
                        <option value="professional" style="color: #333;">Professional</option>
                        <option value="friendly" style="color: #333;">Friendly</option>
                        <option value="formal" style="color: #333;">Formal</option>
                        <option value="casual" style="color: #333;">Casual</option>
                        <option value="polite" style="color: #333;">Polite</option>
                    </select>
                </div>
            </div>
        </div>
    `;
    
    // Re-add all functionality
    makeDraggable(floatingButton);
    addExpandCollapseFunctionality(floatingButton);
    
    // Add click handler for the main content (not the dropdown or handles)
    const mainContent = floatingButton.querySelector('#main-content');
    mainContent.addEventListener('click', function(e) {
        // Don't trigger if clicking on dropdown elements
        if (e.target.id === 'tone-dropdown' || e.target.id === 'tone-selector' || 
            e.target.tagName === 'SELECT' || e.target.tagName === 'OPTION') {
            return;
        }
        
        handleAIButtonClick();
    });
}

console.log("AI Reply by Roch extension initialized");
