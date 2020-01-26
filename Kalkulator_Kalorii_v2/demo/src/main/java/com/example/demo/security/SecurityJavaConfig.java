// package com.example.demo.security;

// import java.util.Arrays;
// import java.util.Collections;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.cglib.beans.ImmutableBean;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import org.springframework.web.filter.CorsFilter;

// @Configuration
// @EnableWebSecurity
// @CrossOrigin(origins = "http://localhost:3000")
// public class SecurityJavaConfig extends WebSecurityConfigurerAdapter {

// 	// @Override
// 	// protected void configure(HttpSecurity http) throws Exception {
// 	// http.csrf().disable().authorizeRequests().antMatchers("/css/**",
// 	// "/index").permitAll();
// 	// }
// 	// @CrossOrigin(origins = "http://localhost:3000")
// 	// @Override
// 	// protected void configure(AuthenticationManagerBuilder auth) throws Exception {
// 	// 	auth.inMemoryAuthentication().withUser("admin").password(encoder().encode("adminPass")).roles("ADMIN").and()
// 	// 			.withUser("user").password(encoder().encode("userPass")).roles("USER");
// 	// }

	

// 	// @Bean
// 	// public PasswordEncoder encoder() {
// 	// 	return new BCryptPasswordEncoder();
// 	// }

// 	// @Bean
// 	// public CorsFilter corsFilter() {
//     // final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//     // final CorsConfiguration config = new CorsConfiguration();
//     // config.setAllowCredentials(true);
//     // // Don't do this in production, use a proper list  of allowed origins
//     // config.setAllowedOrigins(Collections.singletonList("*"));
//     // config.setAllowedHeaders(Arrays.asList("Origin", "Content-Type", "Accept"));
//     // config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "OPTIONS", "DELETE", "PATCH"));
//     // source.registerCorsConfiguration("/**", config);
//     // return new CorsFilter(source);
// 	// }


// 	// @Bean
//     // CorsConfigurationSource corsConfigurationSource() {
//     //     UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//     //     source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
//     //     return source;
// 	// }
	

// 	// @Bean
// 	// CorsConfigurationSource corsConfigurationSource() {
// 	// 	CorsConfiguration configuration = new CorsConfiguration();
// 	// 	configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000/"));
// 	// 	configuration.setAllowedMethods(Arrays.asList("GET","POST"));
// 	// 	UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
// 	// 	source.registerCorsConfiguration("/**", configuration);
// 	// 	return source;
// 	// }

// 	// @Override
// 	// protected void configure(HttpSecurity http) throws Exception {
// 	// 	http.cors().and().csrf().disable()
// 	// 	.exceptionHandling()
// 	// 	.authenticationEntryPoint(new RestAuthenticationEntryPoint())
// 	// 	.and().authorizeRequests()
// 	// 	.antMatchers("/api/foos")
// 	// 	.authenticated().antMatchers("/api/admin/**")
// 	// 	.hasRole("ADMIN").and().formLogin()
// 	// 	.successHandler(new MySavedRequestAwareAuthenticationSuccessHandler())
// 	// 	.failureHandler(new SimpleUrlAuthenticationFailureHandler())
// 	// 	.and()
// 	// 	.logout();
// 	// }

// 	// @Override
//     // protected void configure(HttpSecurity http) throws Exception {
//     //    http.cors()
//     //            .and().csrf().disable()
//     //            .exceptionHandling()
//     //            .authenticationEntryPoint(new RestAuthenticationEntryPoint())
//     //            .and()
//     //            .authorizeRequests()
//     //            .anyRequest().authenticated()
//     //            .and()
//     //            .formLogin()
//     //            .successHandler(new MySavedRequestAwareAuthenticationSuccessHandler())
//     //            .failureHandler(new SimpleUrlAuthenticationFailureHandler())
//     //            .and()
// 	// 		   .logout();
// 	// 										//    http.cors().configurationSource(request -> new CorsConfiguration()
// 	// 										//    .applyPermitDefaultValues());
// 	// 							}
// 	// @CrossOrigin(origins = "http://localhost:3000")
//     // @Override
//     // protected void configure(HttpSecurity http) throws Exception {
// 	//    http.cors()
//     //            .and().csrf()
//     //            .and().exceptionHandling()
//     //            .authenticationEntryPoint(new RestAuthenticationEntryPoint())
//     //            .and()
//     //            .authorizeRequests()
//     //            .anyRequest().authenticated()
//     //            .and()
//     //            .formLogin()
//     //            .successHandler(new MySavedRequestAwareAuthenticationSuccessHandler())
//     //            .failureHandler(new SimpleUrlAuthenticationFailureHandler())
//     //            .and()
//     //            .logout();
//     // }
	
	

// }