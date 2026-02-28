package io.github.jonathankleve.reimbursementservice.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer{
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") //allow all endpoints
                .allowedOrigins("http://localhost:4200") //allow angular
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS") //explicitly allow PATCH and OPTIONS
                .allowedHeaders("*") //allow all headers
                .allowCredentials(true);
    }

}
