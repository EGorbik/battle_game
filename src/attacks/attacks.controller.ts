import {Controller, Get} from '@nestjs/common';
import {AttacksService} from "./attacks.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Attacks')
@Controller('attacks')
export class AttacksController {
    constructor(private attacksService: AttacksService) {}

    @ApiOperation({summary: 'Get all attacks'})
    @Get()
    getAll() {
        return this.attacksService.getAllAttacks();
    }
}
