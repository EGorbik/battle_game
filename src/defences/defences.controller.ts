import {Controller, Get} from '@nestjs/common';
import {DefencesService} from "./defences.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Defences')
@Controller('defences')
export class DefencesController {
    constructor(private defencesService: DefencesService) {}

    @ApiOperation({summary: 'Get all defences'})
    @Get()
    getAll() {
        return this.defencesService.getAllDefences();
    }
}
