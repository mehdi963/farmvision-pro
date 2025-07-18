#!/bin/bash

# FarmVision Pro Docker Setup Script
# This script helps you quickly set up and run the FarmVision Pro application using Docker

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        echo "Visit: https://docs.docker.com/get-docker/"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        echo "Visit: https://docs.docker.com/compose/install/"
        exit 1
    fi
    
    print_success "Docker and Docker Compose are installed"
}

# Function to display usage
show_usage() {
    echo "FarmVision Pro Docker Setup"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  dev         Start development environment"
    echo "  prod        Start production environment"
    echo "  build       Build the Docker image"
    echo "  stop        Stop all containers"
    echo "  clean       Remove containers and images"
    echo "  logs        Show container logs"
    echo "  help        Show this help message"
    echo ""
}

# Function to start development environment
start_dev() {
    print_status "Starting FarmVision Pro in development mode..."
    docker-compose -f docker-compose.dev.yml up --build -d
    print_success "Development environment started!"
    print_status "Application is available at: http://localhost:8000"
    print_status "To view logs: $0 logs"
}

# Function to start production environment
start_prod() {
    print_status "Starting FarmVision Pro in production mode..."
    docker-compose -f docker-compose.prod.yml up --build -d
    print_success "Production environment started!"
    print_status "Application is available at: http://localhost:3000"
    print_status "To view logs: $0 logs"
}

# Function to build the image
build_image() {
    print_status "Building FarmVision Pro Docker image..."
    docker build -t farmvision-pro .
    print_success "Docker image built successfully!"
}

# Function to stop containers
stop_containers() {
    print_status "Stopping all FarmVision Pro containers..."
    docker-compose -f docker-compose.dev.yml down 2>/dev/null || true
    docker-compose -f docker-compose.prod.yml down 2>/dev/null || true
    docker-compose down 2>/dev/null || true
    print_success "All containers stopped!"
}

# Function to clean up
clean_up() {
    print_warning "This will remove all FarmVision Pro containers and images!"
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Cleaning up containers and images..."
        stop_containers
        docker rmi farmvision-pro 2>/dev/null || true
        docker system prune -f
        print_success "Cleanup completed!"
    else
        print_status "Cleanup cancelled."
    fi
}

# Function to show logs
show_logs() {
    print_status "Showing container logs..."
    if docker-compose -f docker-compose.dev.yml ps -q 2>/dev/null | grep -q .; then
        docker-compose -f docker-compose.dev.yml logs -f
    elif docker-compose -f docker-compose.prod.yml ps -q 2>/dev/null | grep -q .; then
        docker-compose -f docker-compose.prod.yml logs -f
    else
        print_warning "No running containers found."
    fi
}

# Main script logic
main() {
    check_docker
    
    case "${1:-help}" in
        "dev")
            start_dev
            ;;
        "prod")
            start_prod
            ;;
        "build")
            build_image
            ;;
        "stop")
            stop_containers
            ;;
        "clean")
            clean_up
            ;;
        "logs")
            show_logs
            ;;
        "help"|*)
            show_usage
            ;;
    esac
}

# Run the main function
main "$@"
