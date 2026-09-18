package main;

import java.awt.BorderLayout;
import java.awt.GridLayout;
import java.util.List;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.SwingUtilities;
import javax.swing.table.DefaultTableModel;

import model.Course;
import service.CourseService;

public class CourseManagementUI extends JFrame {

    private JTextField idField;
    private JTextField nameField;
    private JTextField durationField;
    private JTextField feeField;

    private JTable table;
    private DefaultTableModel tableModel;

    private CourseService service;

    public CourseManagementUI() {

        service = new CourseService();

        setTitle("Course Management System");

        setSize(800, 500);

        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        setLocationRelativeTo(null);

        createUI();

        loadCourses();
    }

    private void createUI() {

        // Form panel

        JPanel formPanel = new JPanel();

        formPanel.setLayout(new GridLayout(4, 2, 10, 10));

        formPanel.add(new JLabel("Course ID:"));

        idField = new JTextField();

        formPanel.add(idField);

        formPanel.add(new JLabel("Course Name:"));

        nameField = new JTextField();

        formPanel.add(nameField);

        formPanel.add(new JLabel("Duration (months):"));

        durationField = new JTextField();

        formPanel.add(durationField);

        formPanel.add(new JLabel("Fee:"));

        feeField = new JTextField();

        formPanel.add(feeField);


        // Buttons

        JPanel buttonPanel = new JPanel();

        JButton addButton = new JButton("Add");

        JButton updateButton = new JButton("Update");

        JButton deleteButton = new JButton("Delete");

        JButton clearButton = new JButton("Clear");

        buttonPanel.add(addButton);

        buttonPanel.add(updateButton);

        buttonPanel.add(deleteButton);

        buttonPanel.add(clearButton);


        // Table

        tableModel = new DefaultTableModel();

        tableModel.addColumn("ID");

        tableModel.addColumn("Course Name");

        tableModel.addColumn("Duration");

        tableModel.addColumn("Fee");

        table = new JTable(tableModel);

        JScrollPane scrollPane = new JScrollPane(table);


        // Add everything to frame

        JPanel topPanel = new JPanel(new BorderLayout());

        topPanel.add(formPanel, BorderLayout.CENTER);

        topPanel.add(buttonPanel, BorderLayout.SOUTH);

        add(topPanel, BorderLayout.NORTH);

        add(scrollPane, BorderLayout.CENTER);


        // Add button

        addButton.addActionListener(e -> addCourse());


        // Update button

        updateButton.addActionListener(e -> updateCourse());


        // Delete button

        deleteButton.addActionListener(e -> deleteCourse());


        // Clear button

        clearButton.addActionListener(e -> clearFields());


        // Table row click

        table.addMouseListener(new java.awt.event.MouseAdapter() {

            public void mouseClicked(java.awt.event.MouseEvent e) {

                int row = table.getSelectedRow();

                if (row >= 0) {

                    idField.setText(
                            tableModel.getValueAt(row, 0).toString()
                    );

                    nameField.setText(
                            tableModel.getValueAt(row, 1).toString()
                    );

                    durationField.setText(
                            tableModel.getValueAt(row, 2).toString()
                    );

                    feeField.setText(
                            tableModel.getValueAt(row, 3).toString()
                    );
                }
            }
        });
    }


    private void addCourse() {

        try {

            String name = nameField.getText();

            int duration =
                    Integer.parseInt(durationField.getText());

            double fee =
                    Double.parseDouble(feeField.getText());

            Course course =
                    new Course(name, duration, fee);

            service.addCourse(course);

            JOptionPane.showMessageDialog(
                    this,
                    "Course added successfully!"
            );

            clearFields();

            loadCourses();

        } catch (Exception e) {

            JOptionPane.showMessageDialog(
                    this,
                    "Please enter valid data!"
            );
        }
    }


    private void updateCourse() {

        try {

            int id =
                    Integer.parseInt(idField.getText());

            String name =
                    nameField.getText();

            int duration =
                    Integer.parseInt(durationField.getText());

            double fee =
                    Double.parseDouble(feeField.getText());

            Course course =
                    new Course(id, name, duration, fee);

            service.updateCourse(course);

            JOptionPane.showMessageDialog(
                    this,
                    "Course updated successfully!"
            );

            clearFields();

            loadCourses();

        } catch (Exception e) {

            JOptionPane.showMessageDialog(
                    this,
                    "Please select a course and enter valid data!"
            );
        }
    }


    private void deleteCourse() {

        try {

            int id =
                    Integer.parseInt(idField.getText());

            service.deleteCourse(id);

            JOptionPane.showMessageDialog(
                    this,
                    "Course deleted successfully!"
            );

            clearFields();

            loadCourses();

        } catch (Exception e) {

            JOptionPane.showMessageDialog(
                    this,
                    "Please select a course!"
            );
        }
    }


    private void clearFields() {

        idField.setText("");

        nameField.setText("");

        durationField.setText("");

        feeField.setText("");
    }


    private void loadCourses() {

        tableModel.setRowCount(0);

        List<Course> courses =
                service.getAllCourses();

        for (Course course : courses) {

            tableModel.addRow(new Object[] {
                    course.getId(),
                    course.getName(),
                    course.getDuration(),
                    course.getFee()
            });
        }
    }


    public static void main(String[] args) {

        SwingUtilities.invokeLater(() -> {

            CourseManagementUI ui =
                    new CourseManagementUI();

            ui.setVisible(true);
        });
    }
}