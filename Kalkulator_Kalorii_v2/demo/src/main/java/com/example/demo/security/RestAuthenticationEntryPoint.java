// package com.example.demo.security;

// import java.io.IOException;

// import javax.servlet.http.HttpServletRequest;
// import javax.servlet.http.HttpServletResponse;

// import org.springframework.security.core.AuthenticationException;
// import org.springframework.security.web.AuthenticationEntryPoint;
// import org.springframework.stereotype.Component;
// import org.springframework.web.bind.annotation.CrossOrigin;

// @CrossOrigin(origins = "http://localhost:3000")
// public final class RestAuthenticationEntryPoint 
//   implements AuthenticationEntryPoint {
 
//     @Override
//     public void commence(
//         HttpServletRequest request, 
//         HttpServletResponse response, 
//         AuthenticationException authException) throws IOException {
         
//         response.sendError(HttpServletResponse.SC_UNAUTHORIZED, 
//           "Brak autoryzacji");
//     }
// }