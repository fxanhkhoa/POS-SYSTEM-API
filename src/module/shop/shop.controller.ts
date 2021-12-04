import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Request,
	UseGuards,
	Query,
	Put
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { Role } from 'src/shared/enum/role.enum';
import { RolesGuard } from 'src/auth/role.guard';

@ApiTags('shop')
@Controller('shop')
export class ShopController {
	constructor(private readonly shopService: ShopService) {}

	@UseGuards(LocalAuthGuard, new RolesGuard([Role.USER, Role.ADMIN]))
	@Post()
	@ApiBearerAuth()
	async create(@Request() req, @Body() createShopDto: CreateShopDto) {
		return await this.shopService.create(createShopDto, req.user);
	}

	@Get()
	@ApiQuery({ name: 'page', required: false, example: '0' })
	@ApiQuery({ name: 'limit', required: false, example: '10' })
	@ApiBearerAuth()
	async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
		return await this.shopService.findAll(page, limit);
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return await this.shopService.findOne(id);
	}

	@UseGuards(LocalAuthGuard, new RolesGuard([Role.USER, Role.ADMIN]))
	@Put(':id')
	async update(
		@Request() req,
		@Param('id') id: string,
		@Body() updateShopDto: UpdateShopDto
	) {
		return await this.shopService.update(id, updateShopDto, req.user);
	}

	@UseGuards(LocalAuthGuard, new RolesGuard([Role.USER, Role.ADMIN]))
	@Delete(':id')
	async remove(@Request() req, @Param('id') id: string) {
		return await this.shopService.remove(id, req.user);
	}
}
