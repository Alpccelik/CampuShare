package com.campushare.repository;

import com.campushare.domain.Event;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Event entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    @Query("select event from Event event where event.user.login = ?#{principal.username}")
    List<Event> findByUserIsCurrentUser();

}
