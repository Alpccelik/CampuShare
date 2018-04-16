package com.campushare.service;

import com.campushare.domain.Event;
import com.campushare.repository.UserRepository;
import com.campushare.service.dto.EventDTO;
import com.campushare.service.mapper.EventMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Component
public class EventMapperImpl implements EventMapper {


    @Override
    public EventDTO toDto(Event event) {
        return new EventDTO(event);
    }

    @Override
    public List<Event> toEntity(List<EventDTO> dtoList) {
        return dtoList.stream().map(this::eventDtoToEvent).collect(toList());
    }

    @Override
    public List<EventDTO> toDto(List<Event> entityList) {
        return entityList.stream().map(EventDTO::new).collect(toList());
    }

    @Override
    public Event toEntity(EventDTO eventDTO) {
        return eventDtoToEvent(eventDTO);
    }

    private Event eventDtoToEvent(EventDTO eventDTO) {
        Event event = new Event();
        event.setId(eventDTO.getId());
        event.setAdress(eventDTO.getAdress());
        event.setDescription(eventDTO.getDescription());
        event.setEndDate(eventDTO.getEndDate());
        event.setMaxPeople(eventDTO.getMaxPeople());
        event.setStartDate(eventDTO.getStartDate());
        event.setCategory(eventDTO.getCategory());
        return event;
    }
}
