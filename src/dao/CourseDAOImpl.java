package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import model.Course;
import util.DBConnection;

public class CourseDAOImpl implements CourseDAO {

    @Override
    public void addCourse(Course course) {

        String sql =
            "INSERT INTO course(name, duration, fee) VALUES (?, ?, ?)";

        try {
            Connection con = DBConnection.getConnection();

            PreparedStatement ps = con.prepareStatement(sql);

            ps.setString(1, course.getName());
            ps.setInt(2, course.getDuration());
            ps.setDouble(3, course.getFee());

            ps.executeUpdate();

            System.out.println("Course added successfully!");

            con.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<Course> getAllCourses() {

        List<Course> courses = new ArrayList<>();

        String sql = "SELECT * FROM course";

        try {
            Connection con = DBConnection.getConnection();

            PreparedStatement ps = con.prepareStatement(sql);

            ResultSet rs = ps.executeQuery();

            while (rs.next()) {

                Course course = new Course();

                course.setId(rs.getInt("id"));
                course.setName(rs.getString("name"));
                course.setDuration(rs.getInt("duration"));
                course.setFee(rs.getDouble("fee"));

                courses.add(course);
            }

            con.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return courses;
    }

    @Override
    public Course getCourseById(int id) {

        String sql =
            "SELECT * FROM course WHERE id = ?";

        try {
            Connection con = DBConnection.getConnection();

            PreparedStatement ps =
                    con.prepareStatement(sql);

            ps.setInt(1, id);

            ResultSet rs = ps.executeQuery();

            if (rs.next()) {

                Course course = new Course(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getInt("duration"),
                        rs.getDouble("fee")
                );

                con.close();

                return course;
            }

            con.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public void updateCourse(Course course) {

        String sql =
            "UPDATE course SET name=?, duration=?, fee=? WHERE id=?";

        try {
            Connection con = DBConnection.getConnection();

            PreparedStatement ps =
                    con.prepareStatement(sql);

            ps.setString(1, course.getName());
            ps.setInt(2, course.getDuration());
            ps.setDouble(3, course.getFee());
            ps.setInt(4, course.getId());

            ps.executeUpdate();

            System.out.println("Course updated successfully!");

            con.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteCourse(int id) {

        String sql =
            "DELETE FROM course WHERE id=?";

        try {
            Connection con = DBConnection.getConnection();

            PreparedStatement ps =
                    con.prepareStatement(sql);

            ps.setInt(1, id);

            ps.executeUpdate();

            System.out.println("Course deleted successfully!");

            con.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}