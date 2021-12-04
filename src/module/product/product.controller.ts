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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Role } from 'src/shared/enum/role.enum';

@ApiTags('product')
@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@UseGuards(LocalAuthGuard, new RolesGuard([Role.USER, Role.ADMIN]))
	@Post()
	@ApiBearerAuth()
	async create(@Request() req, @Body() createProductDto: CreateProductDto) {
		return await this.productService.create(createProductDto, req.user);
	}

	@UseGuards(LocalAuthGuard, new RolesGuard([Role.USER, Role.ADMIN]))
	@Get()
	@ApiQuery({ name: 'page', required: false, example: '0' })
	@ApiQuery({ name: 'limit', required: false, example: '10' })
	@ApiQuery({
		name: 'shopId',
		required: false,
		example: '61a9d8a920f9e30c0a1547ab'
	})
	@ApiBearerAuth()
	async findAllInShop(
		@Request() req,
		@Query('page') page = 1,
		@Query('limit') limit = 10,
		@Query('shopId') shopId: string
	) {
		return await this.productService.findAllInShop(
			shopId,
			page,
			limit,
			req.user
		);
	}

	@UseGuards(LocalAuthGuard, new RolesGuard([Role.USER, Role.ADMIN]))
	@Get(':barcode')
	@ApiQuery({
		name: 'shopId',
		required: false,
		example: '61a9d8a920f9e30c0a1547ab'
	})
	@ApiBearerAuth()
	async findOne(
		@Request() req,
		@Param('barcode') barcode: string,
		@Query('shopId') shopId: string
	) {
		return this.productService.findOne(barcode, shopId, req.user);
	}

	@UseGuards(LocalAuthGuard, new RolesGuard([Role.USER, Role.ADMIN]))
	@Put(':barcode')
	@ApiQuery({
		name: 'shopId',
		required: false,
		example: '61a9d8a920f9e30c0a1547ab'
	})
	@ApiBearerAuth()
	async update(
		@Request() req,
		@Param('barcode') barcode: string,
		@Query('shopId') shopId: string,
		@Body() updateProductDto: UpdateProductDto
	) {
		return await this.productService.update(
			barcode,
			updateProductDto,
			shopId,
			req.user
		);
	}

	@UseGuards(LocalAuthGuard, new RolesGuard([Role.USER, Role.ADMIN]))
	@Delete(':barcode')
	@ApiQuery({
		name: 'shopId',
		required: false,
		example: '61a9d8a920f9e30c0a1547ab'
	})
	@ApiBearerAuth()
	async remove(
		@Request() req,
		@Param('barcode') barcode: string,
		@Query('shopId') shopId: string
	) {
		return await this.productService.remove(barcode, shopId, req.user);
	}
}
