package service;

import java.util.List;

import dao.CourseDAO;
import dao.CourseDAOImpl;
import model.Course;

public class CourseService {

    private CourseDAO courseDAO;

    public CourseService() {
        courseDAO = new CourseDAOImpl();
    }

    public void addCourse(Course course) {

        if (course.getName() == null || course.getName().isEmpty()) {
            System.out.println("Course name cannot be empty!");
            return;
        }

        if (course.getDuration() <= 0) {
            System.out.println("Duration must be greater than 0!");
            return;
        }

        if (course.getFee() <= 0) {
            System.out.println("Fee must be greater than 0!");
            return;
        }

        courseDAO.addCourse(course);
    }

    public List<Course> getAllCourses() {
        return courseDAO.getAllCourses();
    }

    public Course getCourseById(int id) {
        return courseDAO.getCourseById(id);
    }

    public void updateCourse(Course course) {
        courseDAO.updateCourse(course);
    }

    public void deleteCourse(int id) {
        courseDAO.deleteCourse(id);
    }
}