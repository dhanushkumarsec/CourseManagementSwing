package dao;

import java.util.List;
import model.Course;

public interface CourseDAO {

    void addCourse(Course course);

    List<Course> getAllCourses();

    Course getCourseById(int id);

    void updateCourse(Course course);

    void deleteCourse(int id);
}