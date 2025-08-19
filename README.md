# next-video-site

This Next.js app demonstrates a simple ticket purchase flow using CloudFront signed cookies. Users buy a ticket on `/purchase`, which sets signed cookies via an API route. Middleware checks these cookies before allowing access to the protected `/watch` page.
