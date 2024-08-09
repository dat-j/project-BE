import { Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { NoteService } from './note.service';
import { GetUser } from 'src/auth/decorator';


@UseGuards(JwtGuard)
@Controller('note')
export class NoteController {
    constructor(private noteSerVice: NoteService){
        
    }
    @Get()
    getNotes(@GetUser('id') userId: number){

    }
    @Get(':id')
    getNoteById(@GetUser('id') userId: number){

    }
    @Post()
    insertNote(){

    }
    @Patch()
    updateNoteById(){

    }
    @Delete()
    deleteNoteById(){

    }
}
