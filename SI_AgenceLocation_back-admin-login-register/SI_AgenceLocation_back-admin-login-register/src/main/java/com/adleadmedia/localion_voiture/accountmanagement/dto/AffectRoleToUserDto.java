package com.adleadmedia.localion_voiture.accountmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class AffectRoleToUserDto {
    private String username;
    private String role;
}
