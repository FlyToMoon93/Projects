package org.example;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.text.PDFTextStripper;

import javax.swing.*;
import javax.swing.filechooser.FileNameExtensionFilter;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class PDFWordSearchGUI {
    private final JFrame frame;
    private final JTextArea resultArea;
    private PDDocument[] documents;
    private final JTextField searchField;
    private final DefaultListModel<String> pdfListModel;

    public PDFWordSearchGUI() {
        frame = new JFrame("PDF Word Search");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        Toolkit toolkit = Toolkit.getDefaultToolkit();
        Dimension screenSize = toolkit.getScreenSize();
        frame.setSize(screenSize.width, screenSize.height);
        frame.setLayout(new BorderLayout());
        JPanel uploadPanel = new JPanel();
        uploadPanel.setLayout(new BorderLayout());
        JPanel buttonPanel = new JPanel();
        buttonPanel.setLayout(new FlowLayout());
        JButton uploadButton = new JButton("PDFs Hochladen");
        uploadButton.addActionListener(e -> uploadPDFs());
        buttonPanel.add(uploadButton);
       pdfListModel = new DefaultListModel<>();
        JList<String> pdfList = new JList<>(pdfListModel);
        JScrollPane listScrollPane = new JScrollPane(pdfList);
        listScrollPane.setPreferredSize(new Dimension(150, 0));
        uploadPanel.add(buttonPanel, BorderLayout.NORTH);
        uploadPanel.add(listScrollPane, BorderLayout.CENTER);
        JPanel searchPanel = new JPanel();
        searchPanel.setLayout(new BorderLayout());
        searchField = new JTextField(20);
        searchField.addActionListener(e -> searchWords());
        searchPanel.add(new JLabel("Suche: "), BorderLayout.WEST);
        searchPanel.add(searchField, BorderLayout.CENTER);
        frame.add(uploadPanel, BorderLayout.WEST);
        frame.add(searchPanel, BorderLayout.NORTH);
        resultArea = new JTextArea();
        resultArea.setEditable(false);
        JScrollPane scrollPane = new JScrollPane(resultArea);
        // Setzen Sie den Text "Search in PDF" einmalig vor dem Laden der PDF-Dateien
        JLabel label = new JLabel("Search in PDFs", SwingConstants.CENTER);
        label.setForeground(Color.RED);
        resultArea.setText(""); // Leeren Sie die resultArea
        resultArea.setLayout(new BorderLayout());
        resultArea.add(label, BorderLayout.CENTER);
        frame.add(scrollPane, BorderLayout.CENTER);
        frame.setVisible(true);
    }

    private void uploadPDFs() {
        JFileChooser fileChooser = new JFileChooser();
        fileChooser.setMultiSelectionEnabled(true);
        FileNameExtensionFilter filter = new FileNameExtensionFilter("PDF-Dateien", "pdf");
        fileChooser.setFileFilter(filter);
        int result = fileChooser.showOpenDialog(frame);
        if (result == JFileChooser.APPROVE_OPTION) {
            File[] selectedFiles = fileChooser.getSelectedFiles();
            openPDFs(selectedFiles);
        }
    }

    private void openPDFs(File[] pdfFiles) {
        try {
            if (pdfFiles.length > 20) {
                resultArea.setText("Bitte wählen Sie maximal 20 PDF-Dateien aus.");
                return;
            }

            List<String> pdfNames = new ArrayList<>();
            documents = new PDDocument[pdfFiles.length];

            for (int i = 0; i < pdfFiles.length; i++) {
                documents[i] = PDDocument.load(pdfFiles[i]);
                String title = documents[i].getDocumentInformation().getTitle();
                if (title != null && !title.isEmpty()) {
                    pdfNames.add(title);
                } else {
                    pdfNames.add(pdfFiles[i].getName());
                }
            }
            pdfListModel.clear();
            pdfNames.forEach(pdfListModel::addElement);
        } catch (IOException e) {
            resultArea.setText("Fehler beim Öffnen der PDF-Dateien: " + e.getMessage());
        }
    }

    // Änderungen befinden sich in der searchWords Methode

    private void searchWords() {
        if (documents == null) {
            resultArea.setText("Bitte laden Sie zuerst PDF-Dateien hoch.");
            return;
        }

        String searchText = searchField.getText();
        try {
            DefaultTableModel tableModel = new DefaultTableModel(new Object[]{"Wort", "Seite", "Abschnitt"}, 0);
            boolean wordFound = false;
            int wordCount = 0; // Counter for word occurrences

            for (int docIndex = 0; docIndex < documents.length; docIndex++) {
                PDDocument document = documents[docIndex];
                int currentPage = 1; // Variable to track the current page number

                for (int i = 1; i <= document.getNumberOfPages(); i++) {
                    PDFTextStripper pdfStripper = new PDFTextStripper();
                    pdfStripper.setSortByPosition(true); // Text nach Position sortieren
                    pdfStripper.setStartPage(i);
                    pdfStripper.setEndPage(i);

                    String text = pdfStripper.getText(document);
                    String[] lines = text.split("\n"); // Text in Zeilen aufteilen

                    for (String line : lines) {
                        if (line.contains(searchText)) {
                            wordFound = true;
                            // If word found, add current page number and line to tableModel
                            tableModel.addRow(new Object[]{searchText, currentPage, line});
                            wordCount++; // Increment counter for each occurrence of the word
                            break; // Exit the loop for this page as we only need the first occurrence
                        }
                    }
                    currentPage++;
                }
            }

            if (!wordFound) {
                String countText = "Das Wort \"" + searchText + "\" wurde nicht gefunden.";
                displayResult(countText, Color.RED);
                return;
            }

            // Display number of found words in resultArea
            String countText = "Das Wort \"" + searchText + "\" wurde " + wordCount + " mal gefunden.";
            displayResult(countText, Color.RED);

            JTable resultTable = new JTable(tableModel);
            resultTable.getColumnModel().getColumn(2).setPreferredWidth(800); // Set width of "Abschnitt" column
            JScrollPane scrollPane = new JScrollPane(resultTable);
            Dimension preferredSize = new Dimension(1000, 600); // Set preferred size
            scrollPane.setPreferredSize(preferredSize);
            JOptionPane.showMessageDialog(frame, scrollPane);
        } catch (IOException e) {
            resultArea.setText("Fehler beim Lesen der PDF-Dateien: " + e.getMessage());
        }
    }

    private void displayResult(String text, Color color) {
        JLabel countLabel = new JLabel(text);
        countLabel.setForeground(color);
        countLabel.setHorizontalAlignment(SwingConstants.CENTER);

        resultArea.removeAll();
        resultArea.setLayout(new BorderLayout());
        resultArea.add(countLabel, BorderLayout.NORTH);
        resultArea.revalidate(); // Aktualisieren Sie die resultArea
        resultArea.repaint(); // Neuzeichnen der resultArea
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(PDFWordSearchGUI::new);
    }
}
