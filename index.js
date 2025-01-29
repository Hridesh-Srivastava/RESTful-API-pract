import express from "express"
import bodyParser from "body-parser"
import axios from "axios"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = process.env.PORT || 3000
const API_URL = "https://secrets-api.appbrewery.com"
const myBearerToken = "9dbdfbc1-aef3-4750-8e9d-39fb77dd64c0"

const config = {
  headers: {
    Authorization: `Bearer ${myBearerToken}`,
  },
}

// Move these configurations to the top
app.set("view engine", "ejs")
app.set("views", join(__dirname, "views"))
app.use(bodyParser.urlencoded({ extended: true }))

// Root route
app.get("/", (req, res) => {
  res.render("index", {
    content: "Waiting for response from server...",
  })
})

// Get request
app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id
  try {
    const response = await axios.get(`${API_URL}/secrets/${searchId}`, config)
    res.render("index", {
      content: JSON.stringify(response.data),
    })
  } catch (error) {
    res.render("index", {
      content: JSON.stringify(error.response?.data || error.message),
    })
  }
})

// Post request
app.post("/post-secret", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/secrets`, req.body, config)
    res.render("index", {
      content: JSON.stringify(response.data),
    })
  } catch (error) {
    res.render("index", {
      content: JSON.stringify(error.response?.data || error.message),
    })
  }
})

// Put request
app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id
  try {
    const response = await axios.put(`${API_URL}/secrets/${searchId}`, req.body, config)
    res.render("index", {
      content: JSON.stringify(response.data),
    })
  } catch (error) {
    res.render("index", {
      content: JSON.stringify(error.response?.data || error.message),
    })
  }
})

// Patch request
app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id
  try {
    const response = await axios.patch(`${API_URL}/secrets/${searchId}`, req.body, config)
    res.render("index", {
      content: JSON.stringify(response.data),
    })
  } catch (error) {
    res.render("index", {
      content: JSON.stringify(error.response?.data || error.message),
    })
  }
})

// Delete request
app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id
  try {
    const response = await axios.delete(`${API_URL}/secrets/${searchId}`, config)
    res.render("index", {
      content: JSON.stringify(response.data),
    })
  } catch (error) {
    res.render("index", {
      content: JSON.stringify(error.response?.data || error.message),
    })
  }
})

// Only start the server if we're not in a Vercel environment
if (process.env.VERCEL !== "1") {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

export default app

