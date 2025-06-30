import jwt from 'jsonwebtoken'
import User from '../models/User.js'

/**
 * MIDDLEWARE: requireAuth
 * Purpose: Protect routes that need authentication
 * 
 * How it works:
 * 1. Check if user sent a token in headers
 * 2. Verify the token is valid and not tampered
 * 3. Find the user in database using token's ID
 * 4. Attach user to request object for next routes to use
 * 5. Allow request to continue (or block if invalid)
 */
const requireAuth = async (req, res, next) => {

    // STEP 1: Extract token from request headers
    // Frontend sends: headers: { 'Authorization': 'Bearer jwt_token_here' }
    const { authorization } = req.headers

    // STEP 2: Check if authorization header exists
    if (!authorization) {
        return res.status(401).json({error: 'Authorization token is required'})
    }

    // STEP 3: Extract the actual token from the authorization header
    // Format: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    // We want the part after "Bearer " (index 1 after splitting)
    const token = authorization.split(' ')[1]

    // STEP 4: Verify the token and extract user ID
    try {
        // jwt.verify() checks multiple things and can throw errors:
        
        // EXAMPLE TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU5YWJjZGVmMTIzNDU2Nzg5MCIsImlhdCI6MTczMzgzMjAwMCwiZXhwIjoxNzM0MDkxMjAwfQ.signature_here"
        
        // When decoded, JWT has 3 parts:
        // Header: {"alg":"HS256","typ":"JWT"}
        // Payload: {"_id":"6759abcdef1234567890","iat":1733832000,"exp":1734091200}
        // Signature: (used to verify authenticity)
        
        // jwt.verify() checks:
        // ✅ Is token format valid? (3 parts separated by dots)
        // ✅ Was it signed with our SECRET? (signature matches)
        // ✅ Has it expired? (exp timestamp vs current time)
        // ✅ Has it been tampered with? (signature verification)
        
        // If all checks pass, it returns the PAYLOAD:
        // { _id: "6759abcdef1234567890", iat: 1733832000, exp: 1734091200 }
        // We destructure to get just the _id: "6759abcdef1234567890"
        const { _id } = jwt.verify(token, process.env.SECRET)
        
        // EXAMPLES of what could go wrong:
        // ❌ Invalid format: jwt.verify("not.a.jwt") → throws error
        // ❌ Wrong secret: jwt.verify(token, "wrong_secret") → throws error  
        // ❌ Expired token: jwt.verify(expired_token, SECRET) → throws "TokenExpiredError"
        // ❌ Tampered token: jwt.verify(modified_token, SECRET) → throws "JsonWebTokenError"

        /*
        VISUAL BREAKDOWN OF WHAT HAPPENS:
        
        1. INPUT TOKEN (what we receive):
           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU5YWJjZGVmMTIzNDU2Nzg5MCIsImlhdCI6MTczMzgzMjAwMCwiZXhwIjoxNzM0MDkxMjAwfQ.signature_here"
           
        2. JWT PARTS:
           Header:    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
           Payload:   "eyJfaWQiOiI2NzU5YWJjZGVmMTIzNDU2Nzg5MCIsImlhdCI6MTczMzgzMjAwMCwiZXhwIjoxNzM0MDkxMjAwfQ"  
           Signature: "signature_here"
           
        3. DECODED PAYLOAD (what jwt.verify returns):
           {
             "_id": "6759abcdef1234567890",  ← This is what we extract!
             "iat": 1733832000,             ← When token was issued
             "exp": 1734091200              ← When token expires
           }
           
        4. RESULT:
           const { _id } = ... extracts just "6759abcdef1234567890"
        */
        
        // STEP 5: Find the user in database and attach to request
        // Why check database? Token could be valid but user might be deleted
        // select('_id') means only return the _id field (for performance)
        req.user = await User.findOne({ _id }).select('_id')
        
        // STEP 6: Continue to the next middleware/route handler
        // req.user is now available in all subsequent routes!
        next()
        
    } catch (error) {
        // STEP 7: Handle any errors (invalid token, expired, etc.)
        console.log('Auth error:', error.message)
        return res.status(401).json({error: 'Request is not authorized'})
        // ↑ BEST PRACTICE: Always return when sending response
        // This makes it explicit that the function should stop here
    }
}

export default requireAuth

/**
 * HOW THIS MIDDLEWARE IS USED:
 * 
 * // In your routes:
 * router.get('/workouts', requireAuth, getWorkouts)
 *                        ^^^^^^^^^^^ 
 *                        This runs BEFORE getWorkouts
 * 
 * FLOW:
 * 1. Client sends request with token in headers
 * 2. requireAuth middleware runs first
 * 3. If token valid → req.user is set → next() → getWorkouts runs
 * 4. If token invalid → error response → getWorkouts never runs
 * 
 * EXAMPLE REQUEST:
 * fetch('/api/workouts', {
 *   headers: {
 *     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *   }
 * })
 */