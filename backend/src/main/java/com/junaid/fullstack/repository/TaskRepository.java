package com.junaid.fullstack.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.junaid.fullstack.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {


}

