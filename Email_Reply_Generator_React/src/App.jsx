import { useState } from 'react'
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Card, 
  CardContent, 
  CircularProgress, 
  Fade, 
  Slide,
  Chip,
  Paper,
  Divider
} from '@mui/material'
import { 
  Send as SendIcon, 
  AutoAwesome as SparkleIcon,
  ContentCopy as CopyIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material'
import './App.css'

function App() {
  const [emailContent, setEmailContent] = useState('')
  const [tone, setTone] = useState('friendly')
  const [generatedReply, setGeneratedReply] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const tones = [
    { value: 'friendly', label: 'Friendly', color: '#4CAF50' },
    { value: 'professional', label: 'Professional', color: '#2196F3' },
    { value: 'casual', label: 'Casual', color: '#FF9800' },
    { value: 'formal', label: 'Formal', color: '#9C27B0' },
    { value: 'enthusiastic', label: 'Enthusiastic', color: '#F44336' },
    { value: 'apologetic', label: 'Apologetic', color: '#607D8B' }
  ]

  const handleGenerateReply = async () => {
    if (!emailContent.trim()) {
      setError('Please enter some email content')
      return
    }

    setIsLoading(true)
    setError('')
    setGeneratedReply('')

    try {
      const response = await fetch('http://localhost:8081/api/email/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailContent: emailContent.trim(),
          tone: tone
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.text()
      setGeneratedReply(data)
    } catch (err) {
      setError('Failed to generate reply. Please check your connection and try again.')
      console.error('Error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyReply = () => {
    navigator.clipboard.writeText(generatedReply)
  }

  const handleClearAll = () => {
    setEmailContent('')
    setGeneratedReply('')
    setError('')
  }

  return (
    <Box className="app-container">
      {/* Background Elements */}
      <div className="background-gradient"></div>
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <Container maxWidth="lg" className="main-container">
        {/* Header */}
        <Fade in timeout={800}>
          <Box className="header-section">
            <Box className="logo-container">
              <SparkleIcon className="logo-icon" />
              <Typography variant="h3" className="app-title">
                Email Reply Generator
              </Typography>
            </Box>
            <Typography variant="h6" className="app-subtitle">
              AI-powered email responses that sound like you
            </Typography>
          </Box>
        </Fade>

        {/* Main Content */}
        <Slide direction="up" in timeout={1000}>
          <Box className="content-grid">
            {/* Input Section */}
            <Card className="input-card">
              <CardContent className="card-content">
                <Typography variant="h5" className="section-title">
                  Original Email Content
                </Typography>
                <TextField
                  multiline
                  rows={6}
                  fullWidth
                  placeholder="Paste the email you want to reply to..."
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  className="email-input"
                  variant="outlined"
                />

                <FormControl fullWidth className="tone-selector">
                  <InputLabel>Tone (Optional)</InputLabel>
                  <Select
                    value={tone}
                    label="Tone (Optional)"
                    onChange={(e) => setTone(e.target.value)}
                  >
                    {tones.map((toneOption) => (
                      <MenuItem key={toneOption.value} value={toneOption.value}>
                        <Box className="tone-option">
                          <Chip 
                            label={toneOption.label} 
                            size="small" 
                            style={{ backgroundColor: toneOption.color, color: 'white' }}
                          />
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box className="button-group">
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleGenerateReply}
                    disabled={isLoading || !emailContent.trim()}
                    className="generate-button"
                    startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                  >
                    {isLoading ? 'Generating...' : 'Generate Reply'}
                  </Button>
                  
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handleClearAll}
                    className="clear-button"
                    startIcon={<RefreshIcon />}
                  >
                    Clear All
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Output Section */}
            <Card className="output-card">
              <CardContent className="card-content">
                <Typography variant="h5" className="section-title">
                  Generated Reply
                </Typography>
                
                {error && (
                  <Paper className="error-paper">
                    <Typography color="error">{error}</Typography>
                  </Paper>
                )}

                {generatedReply && (
                  <Fade in timeout={500}>
                    <Box>
                      <Paper className="reply-paper">
                        <Typography className="reply-text">
                          {generatedReply}
                        </Typography>
                      </Paper>
                      <Button
                        variant="outlined"
                        onClick={handleCopyReply}
                        className="copy-button"
                        startIcon={<CopyIcon />}
                      >
                        Copy Reply
                      </Button>
                    </Box>
                  </Fade>
                )}

                {!generatedReply && !isLoading && !error && (
                  <Box className="placeholder-section">
                    <SparkleIcon className="placeholder-icon" />
                    <Typography variant="body1" className="placeholder-text">
                      Your AI-generated reply will appear here
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>
        </Slide>
      </Container>
    </Box>
  )
}

export default App
