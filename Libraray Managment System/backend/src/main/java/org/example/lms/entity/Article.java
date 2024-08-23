package org.example.lms.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Article {

    // Getter und Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)  // Länge der Beschreibung begrenzen, falls erforderlich
    private String description;

    @Lob  // Annotation für große Textdaten (Large Object)
    @Column(columnDefinition = "LONGTEXT")  // für bis zu 4.294.967.295 Zeichen
    private String content;

}
